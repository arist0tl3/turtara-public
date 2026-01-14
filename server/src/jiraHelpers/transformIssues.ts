import { Changelog } from 'jira.js/out/version2/models';
import { Issue } from 'jira.js/out/version3/models/issue';
import { IPerson } from '../models/Person/model';
import { Sprint, SprintIssue, SprintContribution } from '../generated';

function calculateTimeInStatuses(transitions: Changelog[]): { status: string; timeInStatus: number }[] {
  // Helper function to parse JIRA date-time strings
  function parseDate(dateStr: string) {
    return new Date(dateStr).getTime();
  }

  // Sort transitions by created time in ascending order (oldest to newest)
  transitions.sort((a, b) => new Date(a.created || '').getTime() - new Date(b.created || '').getTime());

  const timeInStatusesMap: { [key: string]: number } = {};
  let previousStatus: string | null = null;
  let previousTime: number | null = null;

  for (let i = 0; i < transitions.length; i++) {
    const transition = transitions[i];
    const currentTime = parseDate(transition.created || '');
    // @ts-ignore next-line
    const currentStatus: string = transition?.['toString'];

    // If there's a previous status, calculate time spent in it
    if (previousStatus && previousTime !== null) {
      const timeSpent = (currentTime - previousTime) / (24 * 60 * 60 * 1000);
      const roundedTimeSpent = parseFloat(timeSpent.toFixed(2));

      if (!timeInStatusesMap[previousStatus]) {
        timeInStatusesMap[previousStatus] = 0;
      }
      timeInStatusesMap[previousStatus] += roundedTimeSpent;
    }

    // Update previous status and time
    previousStatus = currentStatus;
    previousTime = currentTime;
  }

  // Convert the map to an array of objects with status and timeInStatus
  return Object.entries(timeInStatusesMap).map(([status, timeInStatus]) => ({
    status,
    timeInStatus,
  }));
}

function transformIssueData(issue: Issue, teamMembers: IPerson[], resolvedAt: Date): SprintIssue {
  const personId = teamMembers.find(
    (teamMember) => `${teamMember.firstName} ${teamMember.lastName}` === issue?.fields?.assignee?.displayName,
  )?._id;

  const timeInStatuses = calculateTimeInStatuses(
    (issue?.changelog?.histories || [])
      .map((change) => ({
        created: change.created,
        field: change?.items?.[0]?.field,
        fromString: change?.items?.[0]?.fromString,
        toString: change?.items?.[0]?.toString,
      }))
      .filter((change) => change.field === 'status'),
  );

  const cycleTime = timeInStatuses.map((t) => t.timeInStatus).reduce((acc, cur) => acc + cur, 0);
  const devCycleTime = timeInStatuses.filter((t) => t.status === 'In Progress').reduce((acc, cur) => acc + cur.timeInStatus, 0);
  const codeReviewCycleTime = timeInStatuses.filter((t) => t.status === 'Code Review').reduce((acc, cur) => acc + cur.timeInStatus, 0);
  const readyForQACycleTime = timeInStatuses.filter((t) => t.status === 'To QA').reduce((acc, cur) => acc + cur.timeInStatus, 0);
  const qaCycleTime = timeInStatuses.filter((t) => t.status === 'LC QA').reduce((acc, cur) => acc + cur.timeInStatus, 0);
  const roundedCycleTime = parseFloat(cycleTime.toFixed(2));

  return {
    id: issue.id,
    createdAt: new Date(issue.fields.created),
    cycleTime: roundedCycleTime,
    codeReviewCycleTime,
    readyForQACycleTime,
    devCycleTime,
    qaCycleTime,
    key: issue.key,
    personId,
    resolvedAt,
    status: issue.fields.status.name,
    storyPoints: issue.fields.customfield_10008,
    timeInStatuses,
  };
}

function transformIssues(issues: Issue[], teamMembers: IPerson[]): Sprint[] {
  const sprints: Sprint[] = [];

  issues.forEach((issue) => {
    let resolutionDate: string | undefined | null = issue?.fields?.resolutiondate;

    if (!resolutionDate) {
      const historyResolution = (issue?.changelog?.histories || []).find((history) => {
        if (history.items?.[0]?.field === 'status') {
          return ['Done', 'In Production', 'Finished', 'Released', 'Shipped'].includes(history.items?.[0]?.toString || '');
        }
      });

      if (!!historyResolution) {
        resolutionDate = historyResolution.created;
      }
    }

    if (!resolutionDate) return;

    const resolvedAt = new Date(resolutionDate);

    const issueSprints: Sprint[] = issue?.fields?.customfield_10007 || [];
    const issueSprint: Sprint | undefined = issueSprints.find((sprint) => {
      if (!sprint.completeDate) {
        return resolvedAt > new Date(sprint.startDate);
      } else {
        return resolvedAt > new Date(sprint.startDate) && resolvedAt < new Date(sprint.completeDate);
      }
    });

    if (issueSprint) {
      const existingSprintIndex = sprints.findIndex((sprint) => sprint.id === issueSprint.id);

      const transformedIssue = transformIssueData(issue, teamMembers, resolvedAt);

      if (existingSprintIndex === -1) {
        sprints.push({
          ...issueSprint,
          issues: [transformedIssue],
        });
      } else {
        sprints[existingSprintIndex] = {
          ...sprints[existingSprintIndex],
          issues: [...sprints[existingSprintIndex].issues, transformedIssue],
        };
      }
    }
  });

  sprints.forEach((sprint) => {
    const contributions: SprintContribution[] = [];

    teamMembers.forEach((teamMember) => {
      const teamMemberIssues = sprint.issues.filter((issue) => issue.personId === teamMember._id);
      const storyPoints = teamMemberIssues
        .filter((issue) => typeof issue.storyPoints === 'number')
        .map((issue) => issue.storyPoints)
        .reduce((acc, cur) => (acc || 0) + (cur || 0), 0);

      const issuesWithCycleTime = teamMemberIssues.filter((issue) => typeof issue.cycleTime === 'number');
      const averageCycleTime = issuesWithCycleTime.length
        ? (issuesWithCycleTime.map((issue) => issue.cycleTime).reduce((acc, cur) => (acc || 0) + (cur || 0), 0) || 0) /
          issuesWithCycleTime.length
        : 0;

      const roundedAverageCycleTime = parseFloat(averageCycleTime.toFixed(2));

      if (!!storyPoints) {
        contributions.push({
          personId: teamMember._id,
          storyPoints,
          averageCycleTime: roundedAverageCycleTime,
          issueCount: teamMemberIssues.length,
        });
      }
    });

    sprint.contributions = contributions;

    let devCycleTime = 0;
    let codeReviewCycleTime = 0;
    let readyForQACycleTime = 0;
    let qaCycleTime = 0;

    sprint.issues.forEach((issue) => {
      if (issue.devCycleTime) devCycleTime += issue.devCycleTime;
      if (issue.qaCycleTime) qaCycleTime += issue.qaCycleTime;
      if (issue.codeReviewCycleTime) codeReviewCycleTime += issue.codeReviewCycleTime;
      if (issue.readyForQACycleTime) readyForQACycleTime += issue.readyForQACycleTime;
    });

    sprint.devCycleTime = devCycleTime;
    sprint.qaCycleTime = qaCycleTime;
    sprint.codeReviewCycleTime = codeReviewCycleTime;
    sprint.readyForQACycleTime = readyForQACycleTime;

    return sprint;
  });

  return sprints
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 6)
    .reverse();
}

export default transformIssues;
