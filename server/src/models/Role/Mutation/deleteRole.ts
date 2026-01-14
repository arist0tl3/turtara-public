import type { IContext } from '../../../types';
import type { MutationDeleteRoleArgs, DeleteRoleResponse } from '../../../generated';

async function deleteRole(parent: undefined, args: MutationDeleteRoleArgs, context: IContext): Promise<DeleteRoleResponse> {
  try {
    if (!context.currentUser?._id) throw new Error('You must be logged in to do that');

    await context.models.Role.findOneAndUpdate(
      {
        _id: args.input.roleId,
        createdById: context.currentUser._id,
      },
      {
        $set: {
          deleted: true,
          deletedAt: new Date(),
          deletedById: context.currentUser._id,
        },
      },
    );

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      error: err.toString(),
      success: false,
    };
  }
}

export default deleteRole;
