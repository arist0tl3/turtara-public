import { IContext } from '../../../types';
import { CurrentUser } from '../../../generated';

async function hasJiraToken(parent: CurrentUser, args: undefined, context: IContext): Promise<boolean> {
  const user = await context.models.User.findOne({ _id: parent._id });

  return user?.jiraToken ? true : false;
}

export default hasJiraToken;
