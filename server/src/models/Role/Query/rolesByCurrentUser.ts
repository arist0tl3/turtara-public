import { IContext } from '../../../types';

import { Role } from '../../../generated';

async function rolesByCurrentUser(parent: undefined, args: undefined, context: IContext): Promise<Role[]> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Role.find({
      createdById: context.currentUser._id,
      deleted: {
        $ne: true,
      },
    }).sort({ name: 1 });
  } catch (err) {
    return [];
  }
}

export default rolesByCurrentUser;
