import type { GithubData, Person } from '../../../generated';
import { IContext } from '../../../types';

async function githubData(parent: Person, args: undefined, context: IContext): Promise<GithubData | null> {
  // Return the data from the database
  const person = await context.models.Person.findById(parent._id);

  const githubScores = person?.githubScores;
  const mostRecentGithubScore = githubScores?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())?.[0];
  const previousGithubScore = githubScores?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())?.[1];

  let totalDelta = 0;
  let authorDelta = 0;
  let reviewerDelta = 0;
  if (mostRecentGithubScore && previousGithubScore) {
    totalDelta = mostRecentGithubScore.total - previousGithubScore.total;
    authorDelta = mostRecentGithubScore.author - previousGithubScore.author;
    reviewerDelta = mostRecentGithubScore.reviewer - previousGithubScore.reviewer;
  }

  const pullRequests = await context.models.PullRequest.find({
    personId: parent._id,
  });

  return {
    githubScore: {
      author: mostRecentGithubScore?.author,
      reviewer: mostRecentGithubScore?.reviewer,
      total: mostRecentGithubScore?.total,
      prCount: mostRecentGithubScore?.prCount,
      authorCount: mostRecentGithubScore?.authorCount,
      reviewerCount: mostRecentGithubScore?.reviewerCount,
      meaningfulReviewRatio: mostRecentGithubScore?.meaningfulReviewRatio,
      balanceMultiplier: mostRecentGithubScore?.balanceMultiplier,
      prScores: mostRecentGithubScore?.prScores,

      totalDelta,
      authorDelta,
      reviewerDelta,
    },
    pullRequests,
  };
}

export default githubData;
