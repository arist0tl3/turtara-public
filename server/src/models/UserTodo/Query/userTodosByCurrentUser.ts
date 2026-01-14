import { IContext } from '../../../types';
import { UserTodo } from '../../../generated';

async function userTodosByCurrentUser(parent: undefined, args: undefined, context: IContext): Promise<UserTodo[]> {
  try {
    if (!context?.currentUser?._id) throw new Error('You must be logged in to view todos');

    return context.models.UserTodo.find({
      createdById: context.currentUser._id,
    }).sort({ createdAt: -1 });
  } catch (err) {
    return [];
  }
}

export default userTodosByCurrentUser; 