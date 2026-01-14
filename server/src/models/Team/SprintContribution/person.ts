import type { IPerson } from '../../Person/model';
import type { SprintContribution } from '../../../generated';
import { IContext } from '../../../types';

async function person(parent: SprintContribution, args: undefined, context: IContext): Promise<IPerson | null> {
  try {
    if (!parent.personId || !context?.currentUser?._id) return null;

    const p = await context.dataLoaders.personLoader.load(parent.personId);

    if (p === undefined) return null;

    return p;
  } catch (err) {
    return null;
  }
}

export default person;
