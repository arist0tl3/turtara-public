import type { IContext } from '../../../types';
import type { MutationDeleteFeedbackArgs, DeleteFeedbackResponse } from '../../../generated';

async function deleteFeedback(parent: undefined, args: MutationDeleteFeedbackArgs, context: IContext): Promise<DeleteFeedbackResponse> {
  try {
    if (!context.currentUser?._id) throw new Error('You must be logged in to do that');

    await context.models.Feedback.findOneAndUpdate(
      {
        _id: args.input.feedbackId,
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

export default deleteFeedback;
