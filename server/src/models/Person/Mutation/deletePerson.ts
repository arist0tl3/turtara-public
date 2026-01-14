import type { IContext } from '../../../types';
import type { MutationDeletePersonArgs, DeletePersonResponse } from '../../../generated';

async function deletePerson(parent: undefined, args: MutationDeletePersonArgs, context: IContext): Promise<DeletePersonResponse> {
  try {
    if (!context.currentUser?._id) throw new Error('You must be logged in to do that');

    await context.models.Person.findOneAndUpdate(
      {
        _id: args.input.personId,
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

export default deletePerson;
