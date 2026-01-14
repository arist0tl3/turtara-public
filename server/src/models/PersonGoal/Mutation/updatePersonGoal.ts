import { MutationUpdatePersonGoalArgs, UpdatePersonGoalResponse } from '../../../generated';

import { IContext } from '../../../types';

async function updatePersonGoal(
  parent: undefined,
  args: MutationUpdatePersonGoalArgs,
  context: IContext,
): Promise<UpdatePersonGoalResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const personGoal = await context.models.PersonGoal.findOneAndUpdate(
      {
        _id: args.input.personGoalId,
        createdById: userId,
      },
      {
        content: args.input.content,
        targetDate: args.input.targetDate,
      },
      {
        new: true,
      },
    );

    return {
      personGoal,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default updatePersonGoal;
