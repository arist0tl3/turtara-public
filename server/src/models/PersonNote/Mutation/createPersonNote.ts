import { MutationCreatePersonNoteArgs, CreatePersonNoteResponse } from '../../../generated';

import { IContext } from '../../../types';

async function createPersonNote(
  parent: undefined,
  args: MutationCreatePersonNoteArgs,
  context: IContext,
): Promise<CreatePersonNoteResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const personNote = await context.models.PersonNote.create({
      content: args.input.content,
      createdById: userId,
      personId: args.input.personId,
    });

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

export default createPersonNote;
