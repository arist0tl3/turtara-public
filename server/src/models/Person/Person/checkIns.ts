import type { ICheckIn } from '../../CheckIn/model';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';

async function checkIns(parent: Person, args: undefined, context: IContext): Promise<ICheckIn[]> {
  try {
    if (!parent._id || !context?.currentUser?._id) return [];

    return context.models.CheckIn.find(
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

export default checkIns;
