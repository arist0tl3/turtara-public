import { IContext } from '../../../types';

import { PersonNote, PersonNoteQueryVariables } from '../../../generated';

async function personNote(parent: undefined, args: PersonNoteQueryVariables, context: IContext): Promise<PersonNote | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.PersonNote.findOne({
      _id: args.input.personNoteId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default personNote;
