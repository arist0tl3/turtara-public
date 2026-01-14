import { IContext } from '../../../types';

import { PersonGoal, PersonGoalQueryVariables } from '../../../generated';

async function personGoal(parent: undefined, args: PersonGoalQueryVariables, context: IContext): Promise<PersonGoal | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.PersonGoal.findOne({
      _id: args.input.personGoalId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default personGoal;
