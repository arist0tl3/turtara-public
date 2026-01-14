import type { IPersonGoal } from '../../PersonGoal/model';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';

async function personGoals(parent: Person, args: undefined, context: IContext): Promise<IPersonGoal[]> {
  try {
    if (!parent._id || !context?.currentUser?._id) return [];

    return context.models.PersonGoal.find(
      {
        createdById: context.currentUser._id,
        personId: parent._id,
      },
      {},
      {
        sort: { createdAt: -1 },
      },
    );
  } catch (err) {
    return [];
  }
}

export default personGoals;
