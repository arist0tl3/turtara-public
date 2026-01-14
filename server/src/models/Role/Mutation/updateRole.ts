import { MutationUpdateRoleArgs, UpdateRoleResponse } from '../../../generated';

import { IContext } from '../../../types';

async function updateRole(parent: undefined, args: MutationUpdateRoleArgs, context: IContext): Promise<UpdateRoleResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const role = await context.models.Role.findOneAndUpdate(
      {
        _id: args.input.roleId,
        createdById: userId,
      },
      {
        name: args.input.name,
      },
      {
        new: true,
      },
    );

    return {
      role,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default updateRole;
