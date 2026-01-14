import type { ITeam } from '../../Team/model';
import type { Person } from '../../../generated';
import { IContext } from '../../../types';

async function team(parent: Person, args: undefined, context: IContext): Promise<ITeam | undefined | null> {
  try {
    if (!parent.teamId) return null;

    return context.dataLoaders.teamLoader.load(parent.teamId);
  } catch (err) {
    return null;
  }
}

export default team;
