import { graphql } from '@octokit/graphql';
import getPullRequestsUsingQuery from '../../../githubHelpers/getPullRequestsUsingQuery';
import { IContext } from '../../../types';
import moment from 'moment';
import { calculateEngineerScore } from '../../../githubHelpers/githubScore';

async function updateGithubData(parent: null, args: undefined, context: IContext) {
  try {
    if (!context?.currentUser?._id || !context.currentUser.githubToken || !context.currentUser.githubOrganization) {
      throw new Error('Missing required fields');
    }

    const { githubOrganization, githubToken } = context.currentUser;

    const people = await context.models.Person.find({
      githubHandle: { $exists: true },
      createdById: context.currentUser._id,
    });

    console.log(`Found ${people.length} people to update`);

    const githubClient = graphql.defaults({
      headers: {
        authorization: `token ${githubToken}`,
      },
    });

    const targetDate = new Date();
    targetDate.setTime(targetDate.getTime() - 1000 * 60 * 60 * 24 * 90);

    const targetDateString = moment(targetDate).format('YYYY-MM-DD');

    // Use Promise.all to run all the queries in parallel
    const results = await Promise.all(
      people.map(async (person) => {
        try {
          const authoredPullRequests = await getPullRequestsUsingQuery({
            cache: context.cache,
            githubClient,
            query: `org:${githubOrganization} is:pr is:merged author:${person.githubHandle} merged:>${targetDateString}`,
          });

          const reviewedPullRequests = await getPullRequestsUsingQuery({
            cache: context.cache,
            githubClient,
            query: `org:${githubOrganization} is:pr is:merged reviewed-by:${person.githubHandle} merged:>${targetDateString}`,
          });

          const pullRequests = [
            ...authoredPullRequests.map((pullRequest) => ({
              ...pullRequest,
              role: 'author',
            })),
            ...reviewedPullRequests.map((pullRequest) => ({
              ...pullRequest,
              role: 'reviewer',
            })),
          ];

          const githubScore = calculateEngineerScore(pullRequests);

          // If they have an existing githubScore, move it to githubScores
          if (person.githubScore) {
            await context.models.Person.findByIdAndUpdate(person._id, {
              $push: {
                githubScores: person.githubScore,
              },
            });
            // Delete the existing githubScore
            await context.models.Person.findByIdAndUpdate(person._id, {
              $unset: {
                githubScore: 1,
              },
            });
          }

          // Insert the new githubScore
          await context.models.Person.findByIdAndUpdate(person._id, {
            $push: {
              githubScores: githubScore,
            },
          });

          // Save the pull requests to the database if they don't already exist
          const existingPullRequests = await context.models.PullRequest.find({
            pullRequestId: { $in: pullRequests.map((pullRequest) => pullRequest.id) },
          });

          const pullRequestsToInsert = pullRequests.filter(
            (pullRequest) => !existingPullRequests.some((existingPullRequest) => existingPullRequest.pullRequestId === pullRequest.id),
          );

          await context.models.PullRequest.insertMany(
            pullRequestsToInsert.map((pullRequest) => {
              const { id, ...rest } = pullRequest;
              return {
                ...rest,
                pullRequestId: id,
                personId: person._id,
                githubId: id,
              };
            }),
          );
        } catch (err: any) {
          console.error(`Error updating GitHub data for ${person.githubHandle}: ${err.toString()}`);
          return {
            success: false,
            error: err.toString(),
          };
        }
      }),
    );

    console.log(`Updated ${results.length} people`);

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default updateGithubData;
