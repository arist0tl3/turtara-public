import { IContext } from '../../../types';

import { TeamInsight, RecentTeamInsightQueryVariables } from '../../../generated';

async function recentTeamInsight(parent: undefined, args: RecentTeamInsightQueryVariables, context: IContext): Promise<TeamInsight | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    const { _id: currentUserId } = context.currentUser;
    const { teamId } = args.input;

    return context.models.TeamInsight.findOne(
      {
        createdById: currentUserId,
        teamId,
      },
      {},
      {
        sort: { createdAt: -1 },
      },
    );
  } catch (err: any) {
    console.log('Error fetching recentTeamInsight', err.toString());
    return null;
  }
}

export default recentTeamInsight;
