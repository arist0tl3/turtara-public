import type { IFeedback } from '../../Feedback/model';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';

async function feedback(parent: Person, args: undefined, context: IContext): Promise<IFeedback[]> {
  try {
    if (!parent._id || !context?.currentUser?._id) return [];

    return context.models.Feedback.find(
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

export default feedback;
