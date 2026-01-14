import { CreateCheckInResponse, MutationCreateCheckInArgs } from '../../../generated';
import { IContext } from '../../../types';

async function createCheckIn(parent: undefined, args: MutationCreateCheckInArgs, context: IContext): Promise<CreateCheckInResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create a check-in');

    const checkIn = await context.models.CheckIn.create({
      personId: args.input.personId,
      weeklyGoal: args.input.weeklyGoal,
      meetingRequested: args.input.meetingRequested,
      meetingRequestedReasons: args.input.meetingRequestedReasons,
      weeklyConfidence: args.input.weeklyConfidence,
      weeklyConfidenceReason: args.input.weeklyConfidenceReason,
      createdById: userId,
    });

    return {
      checkIn,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default createCheckIn;
