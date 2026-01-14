import type { TeamPerformance, Team, SprintIssue } from '../../../generated';
import { IContext } from '../../../types';
import searchForIssuesUsingJql from '../../../jiraHelpers/searchForIssuesUsingJql';
import transformIssues from '../../../jiraHelpers/transformIssues';

async function performance(parent: Team, args: undefined, context: IContext): Promise<TeamPerformance | null> {
  try {
    if (!parent._id || !context?.currentUser?._id) return null;

    // Collect the team members
    const teamMembers = await context.models.Person.find({
      createdById: context.currentUser._id,
      teamId: parent._id,
    });

    // Map assignees into JQL
    const assignees = `(${teamMembers.map((teamMember) => `"${teamMember.firstName} ${teamMember.lastName}"`)})`;

    const issues = await searchForIssuesUsingJql({
      cache: context.cache,
      currentUser: context.currentUser,
      expand: 'changelog',
      jql: `Assignee IN ${assignees} AND project = "${parent.name}" AND updated > -120d ORDER BY updated DESC`,
    });

    const issuesBySprint = transformIssues(issues, teamMembers);
    const allIssues: SprintIssue[] = issuesBySprint.map((sprint) => sprint.issues).flat();

    // console.log('issuesBySprints', JSON.stringify(issuesBySprint, null, 2));

    // const individualPerformance = teamMembers.map((teamMember) => {
    //   const teamMemberIssues = allIssues.filter((issue) => issue.personId === teamMember._id);

    //   let devCycleTime = 0;
    //   let qaCycleTime = 0;
    //   let storyPoints = 0;
    //   let issueCount = 0;

    //   teamMemberIssues.forEach((issue) => {
    //     if (!issue.storyPoints) return;

    //     issueCount++;

    //     const timeInProgress = issue.timeInStatuses.find((timeInStatus) => timeInStatus.status === 'In Progress');
    //     const timeInCodeReview = issue.timeInStatuses.find((timeInStatus) => timeInStatus.status === 'Code Review');
    //     const timeInReadyForQA = issue.timeInStatuses.find((timeInStatus) => timeInStatus.status === 'Ready for QA');
    //     const timeInLCQA = issue.timeInStatuses.find((timeInStatus) => timeInStatus.status === 'LC QA');

    //     devCycleTime += (timeInProgress?.timeInStatus || 0) + (timeInCodeReview?.timeInStatus || 0);
    //     qaCycleTime += (timeInReadyForQA?.timeInStatus || 0) + (timeInLCQA?.timeInStatus || 0);
    //     storyPoints += issue.storyPoints;
    //   });

    //   const averageCycleTime = (devCycleTime + qaCycleTime) / issueCount;
    //   const averageDevCycleTime = devCycleTime / issueCount;
    //   const averageCycleTimePerStoryPoint = averageCycleTime / storyPoints;
    //   const averageDevCycleTimePerStoryPoint = averageDevCycleTime / storyPoints;

    //   const x = {
    //     averageCycleTime,
    //     averageDevCycleTime,
    //     averageCycleTimePerStoryPoint,
    //     averageDevCycleTimePerStoryPoint,
    //     personId: teamMember._id,
    //   };

    //   console.log('x', x);
    //   return x;
    // });

    return {
      recentIssuesBySprint: issuesBySprint,
      individualPerformance: [],
    };
  } catch (err) {
    return null;
  }
}

export default performance;
