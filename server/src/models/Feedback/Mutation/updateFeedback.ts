import { MutationUpdateFeedbackArgs, UpdateFeedbackResponse } from '../../../generated';

import { IContext } from '../../../types';

async function updateFeedback(parent: undefined, args: MutationUpdateFeedbackArgs, context: IContext): Promise<UpdateFeedbackResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const feedback = await context.models.Feedback.findOneAndUpdate(
      {
        _id: args.input.feedbackId,
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
      feedback,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default updateFeedback;
