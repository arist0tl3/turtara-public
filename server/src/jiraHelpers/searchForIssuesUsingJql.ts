import { Version3Client } from 'jira.js';
import { Issue } from 'jira.js/out/version3/models/issue';
import type NodeCache from 'node-cache';
import { IUser } from '../models/User/model';

interface SearchForIssuesUsingJqlProps {
  cache: NodeCache;
  currentUser: IUser;
  expand?: string;
  jql: string;
}

interface SearchForIssuesUsingJqlQuery {
  jql: string;
  startAt: number;
  expand?: string;
}

async function searchForIssuesUsingJql({ cache, currentUser, expand, jql }: SearchForIssuesUsingJqlProps): Promise<Issue[]> {
  try {
    const cacheKey = `${expand}${jql}`;
    const cachedString: string | undefined = cache.get(cacheKey);

    if (cachedString) {
      const cachedValue: Issue[] = JSON.parse(cachedString);
      return cachedValue;
    }

    const { jiraHost, jiraToken, jiraEmail } = currentUser;

    if (typeof jiraHost !== 'string' || typeof jiraToken !== 'string' || typeof jiraEmail !== 'string') {
      throw new Error('Missing Jira credentials');
    }

    const jiraClient = new Version3Client({
      host: jiraHost,
      authentication: {
        basic: {
          email: jiraEmail,
          apiToken: jiraToken,
        },
      },
    });

    let hasMore = true;
    let summedIssues: Issue[] = [];
    let startAt = 0;

    while (hasMore) {
      let query: SearchForIssuesUsingJqlQuery = { jql, startAt };
      if (expand) {
        query.expand = expand;
      }

      const { issues = [], total = 0 } = await jiraClient.issueSearch.searchForIssuesUsingJql(query);

      if (issues?.length) {
        summedIssues = [...summedIssues, ...issues];
      }

      if (total > summedIssues?.length) {
        startAt = summedIssues.length;
      } else {
        hasMore = false;
      }
    }

    cache.set(cacheKey, JSON.stringify(summedIssues), 300);

    return summedIssues;
  } catch (err) {
    return [];
  }
}

export default searchForIssuesUsingJql;
