import type { IRole } from '../../Role/model';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';

async function role(parent: Person, args: undefined, context: IContext): Promise<IRole | undefined | null> {
  try {
    if (!parent.roleId) return null;

    return context.dataLoaders.roleLoader.load(parent.roleId);
  } catch (err) {
    return null;
  }
}

export default role;
