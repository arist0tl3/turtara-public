import { IContext } from '../../../types';

import { Feedback, FeedbackQueryVariables } from '../../../generated';

async function feedback(parent: undefined, args: FeedbackQueryVariables, context: IContext): Promise<Feedback | null> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to do this');

    return context.models.Feedback.findOne({
      _id: args.input.feedbackId,
      createdById: context.currentUser._id,
    });
  } catch (err) {
    return null;
  }
}

export default feedback;
