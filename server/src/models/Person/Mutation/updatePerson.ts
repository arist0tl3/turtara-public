import { MutationUpdatePersonArgs, UpdatePersonResponse } from '../../../generated';

import { IContext } from '../../../types';

interface UpdatePersonUpdate {
  firstName?: string;
  lastName?: string;
  kids?: string;
  pets?: string;
  partners?: string;
  profileImageSrc?: string;
  teamId?: string;
  roleId?: string;
  reportsToMe?: boolean;
}

type UpdatePersonUpdateKey = keyof UpdatePersonUpdate;

async function updatePerson(parent: undefined, args: MutationUpdatePersonArgs, context: IContext): Promise<UpdatePersonResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to update an person');

    const { personId, ...rest } = args.input;

    const update: UpdatePersonUpdate = {};
    for (const key of Object.keys(rest)) {
      if (rest[key as UpdatePersonUpdateKey] !== '') {
        // @ts-ignore
        update[key as UpdatePersonKey] = rest[key as UpdatePersonUpdateKey];
      }
    }

    const person = await context.models.Person.findOneAndUpdate(
      {
        _id: personId,
        createdById: userId,
      },
      {
        $set: update,
      },
      {
        new: true,
      },
    );

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

export default updatePerson;
