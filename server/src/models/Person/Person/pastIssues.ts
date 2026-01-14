import { Issue } from '../../../generated';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';
import searchForIssuesUsingJql from '../../../jiraHelpers/searchForIssuesUsingJql';
import transformIssue from '../../../jiraHelpers/transformIssue';

async function pastIssues(parent: Person, args: undefined, context: IContext): Promise<Issue[]> {
  try {
    if (!parent._id || !context?.currentUser?._id || !parent.firstName || !parent.lastName) return [];

    const issues = await searchForIssuesUsingJql({
      cache: context.cache,
      currentUser: context.currentUser,
      expand: 'changelog',
      jql: `Assignee = "${parent.firstName} ${parent.lastName}" AND status IN ("Done", "In Production", "Finished", "Released", "Shipped") AND resolved > -120d ORDER BY updated DESC`,
    });

    // @ts-ignore
    return issues.map(transformIssue);
  } catch (err) {
    return [];
  }
}

export default pastIssues;
