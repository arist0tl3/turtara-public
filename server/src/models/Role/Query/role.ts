import { IContext } from '../../../types';

import { Role, QueryRoleArgs } from '../../../generated';

async function role(parent: undefined, args: QueryRoleArgs, context: IContext): Promise<Role | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Role.findOne({
      _id: args.input.roleId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default role;
