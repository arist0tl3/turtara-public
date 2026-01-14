import { DeleteCheckInResponse, MutationDeleteCheckInArgs } from '../../../generated';
import { IContext } from '../../../types';

async function deleteCheckIn(parent: undefined, args: MutationDeleteCheckInArgs, context: IContext): Promise<DeleteCheckInResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to delete a check-in');

    const checkIn = await context.models.CheckIn.findById(args.input.checkInId);

    if (!checkIn) throw new Error('Check-in not found');

    if (checkIn.createdById !== userId) throw new Error('You can only delete check-ins you created');

    checkIn.deleted = true;
    checkIn.deletedAt = new Date();
    checkIn.deletedById = userId;

    await checkIn.save();

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default deleteCheckIn;
