import { IContext } from '../../../types';

import { Person, PersonQueryVariables } from '../../../generated';

async function person(parent: undefined, args: PersonQueryVariables, context: IContext): Promise<Person | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Person.findOne({
      _id: args.input.personId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default person;
