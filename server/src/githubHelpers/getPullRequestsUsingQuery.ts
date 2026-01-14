import { graphql } from '@octokit/graphql';
import { GraphQlQueryResponseData } from '@octokit/graphql';
import type NodeCache from 'node-cache';

interface GetPullRequestsUsingQueryProps {
  cache: NodeCache;
  githubClient: typeof graphql;
  query: string;
}

async function getPullRequestsUsingQuery({ cache, githubClient, query }: GetPullRequestsUsingQueryProps): Promise<any[]> {
  try {
    const cacheKey = query;
    const cachedValue: any[] | undefined = cache.get(cacheKey);

    if (cachedValue) return cachedValue;

    let hasNextPage = true;
    let summedPullRequests: any[] = [];
    let after;

    while (hasNextPage) {
      const data: GraphQlQueryResponseData = await githubClient(`
      query {
        search(first: 100, type: ISSUE, ${after ? `after: "${after}", ` : ''}query: "${query}") {
          issueCount
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            ...on PullRequest {
              createdAt
              id
              mergedAt
              permalink
              repository {
                id
                name
                url
              }
              title
              additions
              deletions
              reviews(first: 100) {
                nodes {
                  author {
                    login
                  }
                  comments {
                    totalCount
                  }
                  state
                  submittedAt
                }
              }
            }
          }
        }
      }`);

      const pullRequests = data?.search?.nodes || [];
      hasNextPage = data?.search?.pageInfo?.hasNextPage;

      if (hasNextPage) {
        after = data?.search?.pageInfo?.endCursor;
      }

      if (pullRequests?.length) {
        summedPullRequests = [...summedPullRequests, ...pullRequests];
      }
    }

    cache.set(cacheKey, summedPullRequests, 300);

    // console.log('first pull request', JSON.stringify(summedPullRequests[0], null, 2));

    return summedPullRequests;
  } catch (err) {
    console.log('github error', err);
    return [];
  }
}

export default getPullRequestsUsingQuery;
