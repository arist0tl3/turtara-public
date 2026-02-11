import { UpdateCurrentUserResponse } from '../../../generated';
import { MutationUpdateCurrentUserArgs } from '../../../generated';
import { IContext } from '../../../types';

async function updateCurrentUser(
  parent: undefined,
  args: MutationUpdateCurrentUserArgs,
  context: IContext,
): Promise<UpdateCurrentUserResponse> {
  try {
    const { email, phoneNumber } = args.input;

    if (!context.currentUser?._id) {
      throw new Error('User not found');
    }

    const update = {
      email,
      phoneNumber,
    };

    const currentUser = await context.models.User.findOneAndUpdate({ _id: context.currentUser._id }, update, { new: true });

    return {
      success: true,
      currentUser,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      currentUser: null,
      error: error.toString(),
    };
  }
}

export default updateCurrentUser;
