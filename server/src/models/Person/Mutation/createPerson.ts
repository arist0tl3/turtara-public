import { MutationCreatePersonArgs, CreatePersonResponse } from '../../../generated';

import { IContext } from '../../../types';

async function createPerson(parent: undefined, args: MutationCreatePersonArgs, context: IContext): Promise<CreatePersonResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create a person');

    const person = await context.models.Person.create({
      firstName: args.input.firstName,
      lastName: args.input.lastName,
      createdById: userId,
      teamId: args.input.teamId,
      roleId: args.input.roleId,
      reportsToMe: args.input.reportsToMe || false,
    });

    return {
      person,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default createPerson;
