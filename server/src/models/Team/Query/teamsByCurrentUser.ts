import { IContext } from '../../../types';

import { Team } from '../../../generated';

async function teamsByCurrentUser(parent: undefined, args: undefined, context: IContext): Promise<Team[]> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Team.find({
      createdById: context.currentUser._id,
      deleted: {
        $ne: true,
      },
    }).sort({ name: 1 });
  } catch (err) {
    return [];
  }
}

export default teamsByCurrentUser;
