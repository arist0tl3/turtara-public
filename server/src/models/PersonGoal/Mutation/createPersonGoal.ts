import { MutationCreatePersonGoalArgs, CreatePersonGoalResponse } from '../../../generated';

import { IContext } from '../../../types';

async function createPersonGoal(
  parent: undefined,
  args: MutationCreatePersonGoalArgs,
  context: IContext,
): Promise<CreatePersonGoalResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const personGoal = await context.models.PersonGoal.create({
      content: args.input.content,
      createdById: userId,
      personId: args.input.personId,
      targetDate: args.input.targetDate,
    });

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

export default createPersonGoal;
