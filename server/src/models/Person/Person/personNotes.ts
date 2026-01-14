import type { IPersonNote } from '../../PersonNote/model';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';

async function personNotes(parent: Person, args: undefined, context: IContext): Promise<IPersonNote[]> {
  try {
    if (!parent._id || !context?.currentUser?._id) return [];

    return context.models.PersonNote.find(
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

export default personNotes;
