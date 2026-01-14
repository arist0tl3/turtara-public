import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  apiKey: process.env['CLAUDE_API_KEY'],
});

const openai = new OpenAI();

import { IContext } from '../../../types';

import { GenerateTeamInsightMutationVariables, GenerateTeamInsightResponse } from '../../../generated';

import searchForIssuesUsingJql from '../../../jiraHelpers/searchForIssuesUsingJql';
import transformIssues from '../../../jiraHelpers/transformIssues';

const SYSTEM_INSTRUCTIONS_FOR_TEAM_INSIGHT_V4 = `
  You are an assistant to an Engineering Manager at a SaaS company. The manager is sending over
  data about the team's JIRA tickets for the past few sprints. Please create four reports, and provide
  the response in JSON.

  The first report is at the team level, and should grade recent sprints and summarize their success.

  The second report is at the individual level, and should grade contributors and summarize their performance. Include a report for every individual. Factor in the total number of issues as well as the story points / complexity per issue.

  The third report is at the anomaly level, and should identify the most problematic tickets and their impact on the team's performance.

  The fourth report is at the observation level, and should identify the most interesting things about the dataset.

  Scores should use the possible values [-1, 0, 1], where -1 means below average performance, 0 means 
  average performance, and 1 means excellent performance.

  Severity should use the possible values [1, 2, 3, 4, 5] where 1 means that the issue caused a minor
  disruption to the team and 5 means that the team was severely impacted by the resources used to resolve
  the issue.

  When referencing a sprint, make sure to use the sprint id (integer) and not the sprint name (string).

  <example>
  {
    teamLevelReport: [{
      sprintId: 123,
      score: 1,
      summary: "The sprint goal was accomplished, and the team's average cycle time was low."
    },
    {
      sprintId: 124,
      score: -1,
      summary: "The team finished a very low number of tickets given the number of engineers they have. The cycle time was high for the tickets that were completed successfully.",
    },
    {
      sprintId: 125,
      score: 0,
      summary: "The team delivered the average amount of work, and no tickets had high cycle times",
    }],
    individualLevelReport: [{
      personId: 'xxxxxxxx-yyyy-xxxx-yyyy-zzzzzzzzzzzz',
      score: 1,
      summary: 'Consistently high performer with excellent velocity and handling of large stories while maintaining low cycle times. Did a good job of delivering XXX-234 quickly even though it was complex.'
    },
    {
      personId: 'xxxxxxxx-yyyy-xxxx-yyyy-xxxxxxxxxxxx',
      score: 0,
      summary: 'Steady contributor handling moderate to complex tasks with average cycle times.'
    },
    {
      personId: 'xxxxxxxx-yyyy-xxxx-yyyy-yyyyyyyyyyyy',
      score: -1,
      summary: 'Shows higher than average cycle times, even when working on less complex tickets. Of note is ticket XXX-123'
    }
  ],
  issueAnomaliesReport: [
    {
      issueId: 'XXX-1234',
      severity: 5,
      summary: 'Extremely long cycle time of 113.84 days indicates significant blockers or scope issues with XXX-1234.'
    },
    {
      issueId: 'XXX-2345',
      severity: 4,
      summary: 'High cycle time of 65.2 days for XXX-2345 suggests potential process inefficiencies or external dependencies.'
    },
    {
      issueId: 'XXX-3456',
      severity: 4,
      summary: 'XXX-3456 showed concerning cycle time of 64.26 days despite being actively worked on.'
    }
  ],
  observationsReport: [
    'The team shows improving sprint health over time with better cycle time management in recent sprints',
    "There's a pattern of some tickets having extremely long cycle times (>60 days) which may indicate process issues",
    'Story point estimation appears inconsistent across sprints with some tickets missing point values',
    'Sprint 123 shows unusual patterns with multiple tickets having 0 cycle time, suggesting possible tracking issues',
    'Person 'xxxxxxxx-yyyy-xxxx-yyyy-yyyyyyyyyyyy' may have an outsized negative effect on the performance of the team',
    'Work distribution among team members is generally balanced with some variation in complexity of assigned tasks'
  ]

}
`;

// const SYSTEM_INSTRUCTIONS_FOR_TEAM_INSIGHT_V3 = `
// You are an assistant to an Engineering Manager at a SaaS company. The manager is sending over
// data about the team's JIRA tickets for the past few sprints. Create two reports.

// The first report should be at the team level, and based on sprint over sprint changes to
// velocity and cycle time and should indicate if the team is moving in a positive or negative
// direction recently.

// The second report should be at the individual contributor level. Stack rank the contributors.
// High performing contributors should be delivering a high number of tickets and
// story points with low cycle times. For low performers, identify anomalies in
// their work relative to others.
// `;

// const SYSTEM_INSTRUCTIONS_FOR_TEAM_INSIGHT = `
//   You are the manager for a team of software engineers. Below you will find information about
//   the tickets they have recently delivered. Please identify any anomalies, at the individual,
//   team, and sprint level. Look for areas of improvement and speak to the performance of
//   individual contributors. Please return the feedback as a json object. The 'anomalies' key
//   should be an array, each object should specify the 'type' of anomaly with a human friendly 'type',
//   the 'TeamId', 'personId', or 'sprintId', and the anomaly content. The 'areasOfImprovement' should
//   be an array of general topics for the team to work on. The 'oneOnOneTopics' should be an
//   array of topics for discussion or improvement at the individual contributor level and
//   should include the 'personId' as a reference, and a 'topics' with with an array of
//   discussion topics for that person based on their tickets and performance. Reference
//   specific tickets and strategies; if the guidance is only general, do not include it`;

// function extractSprintsFromIssues(issues: any[]) {
//   const sprintsWithIssues: any = {};

//   issues.forEach((issue) => {
//     const { fields } = issue;
//     const sprints = fields?.customFields.sprint || []; // Extract the sprint info; default to an empty array if not found

//     const sprint = sprints.sort((a, b) => a.startDate - b.startDate ? )

//     sprints.forEach((sprint: Sprint) => {
//       const sprintId = sprint.id;

//       console.log('sprintid', sprintId);

//       // If the sprint is not already in the result, add it with a new issues array
//       if (!sprintsWithIssues[sprintId]) {
//         sprintsWithIssues[sprintId] = {
//           id: sprintId,
//           boardId: sprint.boardId,
//           goal: sprint.goal,
//           state: sprint.state,
//           startedAt: sprint.startDate,
//           endedAt: sprint.endDate,
//           issues: [], // Array to hold associated issues
//         };
//       }

//       // Add the current ticket to the corresponding sprint's issues array
//       sprintsWithIssues[sprintId].issues.push(issue);
//     });
//   });

//   return sprintsWithIssues;
// }

async function generateTeamInsight(
  parent: undefined,
  args: GenerateTeamInsightMutationVariables,
  context: IContext,
): Promise<GenerateTeamInsightResponse> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    const { _id: currentUserId } = context.currentUser;
    const { teamId } = args.input;

    // Collect the team members
    const teamMembers = await context.models.Person.find({
      createdById: context.currentUser._id,
      teamId,
    });

    // Grab the team
    const team = await context.models.Team.findOne({
      _id: teamId,
      createdById: context.currentUser._id,
    });

    if (!team) throw new Error('Unable to find team');

    // Map assignees into JQL
    const assignees = `(${teamMembers.map((teamMember) => `"${teamMember.firstName} ${teamMember.lastName}"`)})`;

    const issues = await searchForIssuesUsingJql({
      cache: context.cache,
      currentUser: context.currentUser,
      expand: 'changelog',
      jql: `Assignee IN ${assignees} AND project = "${team.name}" AND updated > -120d ORDER BY updated DESC`,
    });

    const recentIssuesBySprint = transformIssues(issues, teamMembers);

    const cleanedRecentIssuesBySprint = recentIssuesBySprint.map((sprint) => ({
      ...sprint,
      issues: sprint.issues.map((issue) => {
        const { timeInStatuses, ...rest } = issue;

        return rest;
      }),
    }));

    const content = JSON.stringify({
      issues: cleanedRecentIssuesBySprint,
    });

    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     { role: 'system', content: SYSTEM_INSTRUCTIONS_FOR_TEAM_INSIGHT_V4 },
    //     {
    //       role: 'user',
    //       content,
    //     },
    //   ],
    //   response_format: {
    //     type: 'json_object',
    //   },
    // });

    // const response = completion?.choices?.[0]?.message?.content;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8192,
      temperature: 0,
      system: SYSTEM_INSTRUCTIONS_FOR_TEAM_INSIGHT_V4,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    if (response.content?.[0]?.type === 'text') {
      const responseJSON = JSON.parse(response.content[0].text);

      console.log(responseJSON);

      // Store the response
      const teamInsightDoc = await context.models.TeamInsight.create({
        ...responseJSON,
        createdById: currentUserId,
        createdAt: new Date(),
        teamId,
      });

      return {
        error: null,
        teamInsight: teamInsightDoc,
        success: true,
      };
    } else {
      throw new Error('No response from ChatGPT');
    }
  } catch (err: any) {
    console.log('Error creating teamInsight', err.toString());
    return {
      error: err.toString(),
      success: false,
    };
  }
}

export default generateTeamInsight;
