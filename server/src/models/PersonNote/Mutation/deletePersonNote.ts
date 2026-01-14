import type { IContext } from '../../../types';
import type { MutationDeletePersonNoteArgs, DeletePersonNoteResponse } from '../../../generated';

async function deletePersonNote(
  parent: undefined,
  args: MutationDeletePersonNoteArgs,
  context: IContext,
): Promise<DeletePersonNoteResponse> {
  try {
    if (!context.currentUser?._id) throw new Error('You must be logged in to do that');

    await context.models.PersonNote.findOneAndUpdate(
      {
        _id: args.input.personNoteId,
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

export default deletePersonNote;
