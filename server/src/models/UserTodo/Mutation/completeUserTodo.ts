import { MutationCompleteUserTodoArgs, CompleteUserTodoResponse } from '../../../generated';
import { IContext } from '../../../types';

async function completeUserTodo(
  parent: undefined,
  args: MutationCompleteUserTodoArgs,
  context: IContext
): Promise<CompleteUserTodoResponse> {
  try {
    const userId = context?.currentUser?._id;
    if (!userId) throw new Error('You must be logged in to complete a todo');

    const todo = await context.models.UserTodo.findOneAndUpdate(
      {
        _id: args.input.todoId,
        createdById: userId,
      },
      {
        completedAt: new Date(),
      },
      { new: true }
    );

    if (!todo) throw new Error('Todo not found');

    return {
      todo,
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default completeUserTodo; 