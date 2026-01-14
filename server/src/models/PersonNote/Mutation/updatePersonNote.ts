import { MutationUpdatePersonNoteArgs, UpdatePersonNoteResponse } from '../../../generated';

import { IContext } from '../../../types';

async function updatePersonNote(
  parent: undefined,
  args: MutationUpdatePersonNoteArgs,
  context: IContext,
): Promise<UpdatePersonNoteResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const personNote = await context.models.PersonNote.findOneAndUpdate(
      {
        _id: args.input.personNoteId,
        createdById: userId,
      },
      {
        content: args.input.content,
      },
      {
        new: true,
      },
    );

    return {
      personNote,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default updatePersonNote;
