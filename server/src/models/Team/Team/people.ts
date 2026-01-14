import type { IPerson } from '../../Person/model';
import type { Team } from '../../../generated';
import { IContext } from '../../../types';

async function people(parent: Team, args: undefined, context: IContext): Promise<IPerson[]> {
  try {
    if (!parent._id || !context?.currentUser?._id) return [];

    return context.models.Person.find(
      {
        createdById: context.currentUser._id,
        teamId: parent._id,
      },
      {},
      {
        sort: { lastName: -1 },
      },
    );
  } catch (err) {
    return [];
  }
}

export default people;
