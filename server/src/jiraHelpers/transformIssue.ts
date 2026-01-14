import { Issue as JIRAIssue } from 'jira.js/out/version3/models/issue';
import { Issue, TimeInColumn, Sprint } from '../generated';
import moment from 'moment';
import { IPerson } from '../models/Person/model';

const STORY_POINTS_FIELD = 'customfield_10008';
const SPRINT_FIELD = 'customfield_10007';

function convertMillisecondsToDays(time: number): number {
  return Math.round((moment.duration(time).asDays() + Number.EPSILON) * 100) / 100;
}

function mapAssigneeNameToPersonId(assigneeName: string | undefined, teamMembers: IPerson[]): string {
  if (!assigneeName) return '';

  const match = teamMembers.find((teamMember) => `${teamMember.firstName} ${teamMember.lastName}` === assigneeName);

  if (match) return match._id;

  return '';
}

function transformIssue(issue: JIRAIssue, teamMembers: IPerson[]): Issue {
  // Init our aggregates
  let timesInColumns: TimeInColumn[] = [];
  let cycleTimeInMilliseconds = 0;
  let startedAt: Date | null = null;

  // Grab all of the histories, which are themselves arrays
  const histories = issue?.changelog?.histories || [];

  // Reduce all of the items in each history
  const statusHistories = histories
    .map(({ items, ...history }) => (items || []).map((item) => ({ ...history, ...item })))
    .reduce((acc, cur) => acc.concat(cur), [])
    // Filter down to only status updates
    .filter((historyItem) => historyItem?.field === 'status')
    // Sort earliest to latest
    .sort((a, b) => {
      if (!a?.created || !b?.created) return 1;

      return new Date(a.created) > new Date(b.created) ? 1 : -1;
    });

  // Loop through the histories and build up the aggregated times
  statusHistories.forEach(({ created = '', toString = '' }: { created?: string; toString?: string }, statusHistoryIdx: number) => {
    // These _should_ always be defined, if not, the data is likely not valid
    if (!!toString && !!created) {
      // If we haven't captured a start point, assume the first status change
      // is when the issue was picked up; this logic makes assumptions
      if (!startedAt) {
        startedAt = new Date(created);
      }

      // Confirm that there is an additional status, this is the only way to
      // capture the time spent in the current status
      const nextTimestamp = statusHistories?.[statusHistoryIdx + 1]?.created;

      if (!!nextTimestamp) {
        const elapsedTime = new Date(nextTimestamp).getTime() - new Date(created).getTime();

        // Increment the overall cycle time
        cycleTimeInMilliseconds += elapsedTime;

        // Check for an existing item
        const existingTimeInColumnItemIndex = timesInColumns.findIndex((item) => item.columnName === toString);

        // If there is an existing item, we want to append the elapsed time
        // to the current elapsed time in that column
        //
        // This helps us ensure we are capturing the time correctly even
        // if an issue isn't moving in a linear direction through the columns
        if (existingTimeInColumnItemIndex !== -1) {
          const existingTimeInColumnItem = timesInColumns[existingTimeInColumnItemIndex];

          timesInColumns[existingTimeInColumnItemIndex] = {
            ...existingTimeInColumnItem,
            elapsedTime: (existingTimeInColumnItem?.elapsedTime || 0) + elapsedTime,
          };
        } else {
          // If we don't have a match, create a new column starting point
          const newItem = {
            columnName: toString,
            elapsedTime,
          };

          timesInColumns.push(newItem);
        }
      }
    }
  });

  // Map elapsedTime to days
  timesInColumns = timesInColumns.map((timeInColumn) => ({
    ...timeInColumn,
    elapsedTime: convertMillisecondsToDays(timeInColumn?.elapsedTime || 0),
  }));

  const sprint: Sprint = (issue.fields?.[SPRINT_FIELD] || []).pop() || null;

  // Pull the story points from whatever custom field they live in
  const storyPoints: number = issue.fields?.[STORY_POINTS_FIELD] || null;

  // Put cycle time into days, since that is what everyone usually cares about
  const cycleTime = convertMillisecondsToDays(cycleTimeInMilliseconds);

  // If we have the story points, include the ratio
  const cycleTimePerPoint = !!storyPoints ? cycleTime / storyPoints : null;

  // If we have a startedAt, we can assume an ended at by adding the total cycle time
  const endedAt = !!startedAt ? new Date(new Date(startedAt).getTime() + cycleTimeInMilliseconds) : null;

  return {
    assigneeName: issue.fields.assignee.displayName,
    cycleTime,
    cycleTimePerPoint,
    endedAt,
    id: issue.id,
    key: issue.key,
    personId: mapAssigneeNameToPersonId(issue.fields.assignee.displayName, teamMembers),
    self: issue.self,
    startedAt,
    storyPoints,
    summary: issue.fields.summary,
    timesInColumns,
  };
}

export default transformIssue;
