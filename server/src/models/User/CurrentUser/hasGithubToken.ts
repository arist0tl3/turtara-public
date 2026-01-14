import { IContext } from '../../../types';
import { CurrentUser } from '../../../generated';

async function hasGithubToken(parent: CurrentUser, args: undefined, context: IContext): Promise<boolean> {
  const user = await context.models.User.findOne({ _id: parent._id });

  return user?.githubToken ? true : false;
}

export default hasGithubToken;
