import { MutationUncompleteUserTodoArgs, UncompleteUserTodoResponse } from '../../../generated';
import { IContext } from '../../../types';

async function uncompleteUserTodo(
  parent: undefined,
  args: MutationUncompleteUserTodoArgs,
  context: IContext,
): Promise<UncompleteUserTodoResponse> {
  try {
    const userId = context?.currentUser?._id;
    if (!userId) throw new Error('You must be logged in to uncomplete a todo');

    const todo = await context.models.UserTodo.findOneAndUpdate(
      {
        _id: args.input.todoId,
        createdById: userId,
      },
      {
        $unset: { completedAt: 1 },
      },
      { new: true },
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

export default uncompleteUserTodo;
