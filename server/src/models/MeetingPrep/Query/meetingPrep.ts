import OpenAI from 'openai';

const openai = new OpenAI();

import { IContext } from '../../../types';

import { MeetingPrep, MeetingPrepQueryVariables } from '../../../generated';

const SYSTEM_INSTRUCTIONS_FOR_REPORT = `
  You are an assistant to a software engineering manager. That manager regularly 
  meets with their direct reports. Suggest up to five topics for the manager to talk
  to the report about in their next one on one meeting. Do not repeat questions from
  previous meetings. You will be supplied with recent conversations and feedback
  about the report.
  
  Topics should be created using the following order of importance, from most to least:
  1. Follow up on all feedback
  2. Follow up on unresolved issues from the most recent meeting
  3. Follow up on unresolved issues from other meetings
  4. Tactical and strategic suggestions about career and growth opportunities for the report
  
  Focus on brevity, include sub points if they will meaningfully add to the conversation. 
  Format the response in json, nesting any sub points as an array. The top level key 
  should be "suggestedTopics", the nested keys should be "question" and "subPoints", respectively.`;

async function meetingPrep(parent: undefined, args: MeetingPrepQueryVariables, context: IContext): Promise<MeetingPrep | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    const { _id: currentUserId } = context.currentUser;
    const { personId } = args.input;

    const mostRecentConversation = await context.models.PersonNote.findOne(
      {
        createdById: currentUserId,
        personId,
      },
      {},
      {
        sort: { createdAt: -1 },
      },
    );

    // Check to see if we have meeting prep generated more recently than
    // the last conversation; if so, we don't need to query for a new set
    // of topics
    if (mostRecentConversation) {
      const existingMeetingPrep = await context.models.MeetingPrep.findOne({
        createdById: currentUserId,
        createdAt: {
          $gte: mostRecentConversation.createdAt,
        },
        personId,
      });

      if (existingMeetingPrep) {
        return existingMeetingPrep;
      }
    }

    // Generate a new set of topics
    const person = await context.models.Person.findOne({
      _id: personId,
      createdById: currentUserId,
    });

    const relationship = person?.reportsToMe ? 'report' : undefined;

    // Only ask for topics when we know the relationship and can build
    // the proper prompt
    if (!relationship) {
      return null;
    }

    if (relationship === 'report') {
      // Fetch the recent conversations

      const recentConversations = (
        await context.models.PersonNote.find(
          {
            createdById: currentUserId,
            personId,
          },
          {},
          {
            limit: 3,
            sort: { createdAt: -1 },
          },
        )
      ).map((personNote) => ({
        createdAt: personNote.createdAt,
        content: personNote.content,
      }));

      const recentFeedback = (
        await context.models.Feedback.find({
          createdById: currentUserId,
          personId,
          createdAt: {
            $gte: mostRecentConversation?.createdAt,
          },
        })
      ).map((feedback) => ({
        createdAt: feedback.createdAt,
        content: feedback.content,
        type: feedback.type,
      }));

      // If we don't have any conversations, early return with no topics
      // This is an opportunity for a new prompt
      if (!recentConversations?.length) {
        return null;
      }

      const content = JSON.stringify({
        recentConversations,
        recentFeedback,
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTIONS_FOR_REPORT },
          {
            role: 'user',
            content,
          },
        ],
        response_format: {
          type: 'json_object',
        },
      });

      const response = completion?.choices?.[0]?.message?.content;

      if (response) {
        // Parse the json
        const responseJSON = JSON.parse(response);

        // Store the response
        const meetingPrepDoc = await context.models.MeetingPrep.create({
          ...responseJSON,
          createdById: currentUserId,
          createdAt: new Date(),
          personId,
          relationship,
        });

        return meetingPrepDoc;
      }
    }

    return null;
  } catch (err: any) {
    console.log('Error fetching meetingPrep', err.toString());
    return null;
  }
}

export default meetingPrep;
