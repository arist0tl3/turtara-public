import { MutationUpdateTeamArgs, UpdateTeamResponse } from '../../../generated';

import { IContext } from '../../../types';

async function updateTeam(parent: undefined, args: MutationUpdateTeamArgs, context: IContext): Promise<UpdateTeamResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const team = await context.models.Team.findOneAndUpdate(
      {
        _id: args.input.teamId,
        createdById: userId,
      },
      {
        name: args.input.name,
        profileImageSrc: args.input.profileImageSrc,
      },
      {
        new: true,
      },
    );

    return {
      team,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default updateTeam;
