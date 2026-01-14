import { IContext } from '../../../types';
import { AddMeetingPrepTopicMutationVariables, AddMeetingPrepTopicResponse } from '../../../generated';

async function addMeetingPrepTopic(
  parent: undefined,
  args: AddMeetingPrepTopicMutationVariables,
  context: IContext,
): Promise<AddMeetingPrepTopicResponse> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    const { _id: currentUserId } = context.currentUser;
    const { personId, topic } = args.input;

    let meetingPrep = await context.models.MeetingPrep.findOne({
      createdById: currentUserId,
      personId,
      topics: { $gt: 1 },
    }, {}, {
      $sort: { createdAt: -1 },
    });

    if (!meetingPrep) {
      meetingPrep = new context.models.MeetingPrep({
        createdById: currentUserId,
        personId,
        topics: [],
      });
    }

    meetingPrep.topics.push(topic);

    await meetingPrep.save();

    return {
      success: true,
      meetingPrep,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      meetingPrep: null,
    };
  }
}

export default addMeetingPrepTopic;
