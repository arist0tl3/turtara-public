import { groupBy } from 'lodash';

import { PullRequest } from '../generated';

export const thirtyDays = 1000 * 60 * 60 * 24 * 30;
export const sixtyDays = 1000 * 60 * 60 * 24 * 60;
export const ninetyDays = 1000 * 60 * 60 * 24 * 90;

export interface RepoData {
  repoName: string;
  LastThirty: PullRequest[];
  ThirtyToSixty: PullRequest[];
  SixtyToNinety: PullRequest[];
  NinetyToHundredEighty: PullRequest[];
}

function transformPullRequests(pullRequests: PullRequest[]): RepoData[] {
  const pullRequestsGroupedByRepo = groupBy(pullRequests, (pullRequest) => pullRequest.repository.name);
  const pullRequestsByRepoAndDate = Object.keys(pullRequestsGroupedByRepo).map((repoName) => {
    return {
      repoName,
      ...groupBy(pullRequestsGroupedByRepo[repoName], (pullRequest) => {
        if (new Date().getTime() - new Date(pullRequest.mergedAt).getTime() < thirtyDays) return 'LastThirty';
        if (new Date().getTime() - new Date(pullRequest.mergedAt).getTime() < sixtyDays) return 'ThirtyToSixty';
        if (new Date().getTime() - new Date(pullRequest.mergedAt).getTime() < ninetyDays) return 'SixtyToNinety';
        return 'NinetyToHundredEighty';
      }),
    };
  });

  return pullRequestsByRepoAndDate as RepoData[];
}

export default transformPullRequests;
