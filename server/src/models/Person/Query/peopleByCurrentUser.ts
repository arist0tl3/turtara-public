import { IContext } from '../../../types';

import { Person } from '../../../generated';

async function peopleByCurrentUser(parent: undefined, args: undefined, context: IContext): Promise<Person[]> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Person.find({
      createdById: context.currentUser._id,
      deleted: {
        $ne: true,
      },
    }).sort({ firstName: 1 });
  } catch (err) {
    return [];
  }
}

export default peopleByCurrentUser;
