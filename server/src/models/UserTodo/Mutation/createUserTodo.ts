import { MutationCreateUserTodoArgs, CreateUserTodoResponse } from '../../../generated';
import { IContext } from '../../../types';

async function createUserTodo(
  parent: undefined,
  args: MutationCreateUserTodoArgs,
  context: IContext
): Promise<CreateUserTodoResponse> {
  try {
    const userId = context?.currentUser?._id;
    if (!userId) throw new Error('You must be logged in to create a todo');

    const todo = await context.models.UserTodo.create({
      content: args.input.content,
      createdById: userId,
    });

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

export default createUserTodo; 