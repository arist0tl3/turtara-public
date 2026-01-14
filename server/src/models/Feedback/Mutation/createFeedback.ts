import { MutationCreateFeedbackArgs, CreateFeedbackResponse } from '../../../generated';

import { IContext } from '../../../types';

async function createFeedback(parent: undefined, args: MutationCreateFeedbackArgs, context: IContext): Promise<CreateFeedbackResponse> {
  try {
    const userId = context?.currentUser?._id;

    if (!userId) throw new Error('You must be logged in to create an person');

    const feedback = await context.models.Feedback.create({
      content: args.input.content,
      createdById: userId,
      personId: args.input.personId,
      type: args.input.type,
    });

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

export default createFeedback;
