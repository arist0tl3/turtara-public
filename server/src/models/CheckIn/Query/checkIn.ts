import { IContext } from '../../../types';

import { CheckIn, QueryCheckInArgs } from '../../../generated';

async function checkIn(parent: undefined, args: QueryCheckInArgs, context: IContext): Promise<CheckIn | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.CheckIn.findOne({
      _id: args.input.checkInId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default checkIn;
