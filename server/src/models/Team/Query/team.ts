import { IContext } from '../../../types';

import { Team, TeamQueryVariables } from '../../../generated';

async function team(parent: undefined, args: TeamQueryVariables, context: IContext): Promise<Team | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Team.findOne({
      _id: args.input.teamId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default team;
