import { MutationCreateRoleArgs, CreateRoleResponse } from '../../../generated';

import { IContext } from '../../../types';

async function createRole(parent: undefined, args: MutationCreateRoleArgs, context: IContext): Promise<CreateRoleResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const role = await context.models.Role.create({
      name: args.input.name,
      createdById: userId,
    });

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

export default createRole;
