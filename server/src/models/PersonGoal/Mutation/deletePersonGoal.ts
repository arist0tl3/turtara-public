import type { IContext } from '../../../types';
import type { MutationDeletePersonGoalArgs, DeletePersonGoalResponse } from '../../../generated';

async function deletePersonGoal(
  parent: undefined,
  args: MutationDeletePersonGoalArgs,
  context: IContext,
): Promise<DeletePersonGoalResponse> {
  try {
    if (!context.currentUser?._id) throw new Error('You must be logged in to do that');

    await context.models.PersonGoal.findOneAndUpdate(
      {
        _id: args.input.personGoalId,
        createdById: context.currentUser._id,
      },
      {
        $set: {
          deleted: true,
          deletedAt: new Date(),
          deletedById: context.currentUser._id,
        },
      },
    );

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      error: err.toString(),
      success: false,
    };
  }
}

export default deletePersonGoal;
