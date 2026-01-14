import { MutationCreateTeamArgs, CreateTeamResponse } from '../../../generated';

import { IContext } from '../../../types';

async function createTeam(parent: undefined, args: MutationCreateTeamArgs, context: IContext): Promise<CreateTeamResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const team = await context.models.Team.create({
      name: args.input.name,
      createdById: userId,
    });

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

export default createTeam;
