import { Version3Client } from 'jira.js';
import { GetSprintsResponse } from '../../../generated';

async function getSprints(parent: any, args: any, context: any): Promise<GetSprintsResponse> {
  try {
    const { jiraHost, jiraToken, jiraEmail } = context?.currentUser;

    if (typeof jiraHost !== 'string' || typeof jiraToken !== 'string' || typeof jiraEmail !== 'string') {
      throw new Error('Missing Jira credentials');
    }

    const jiraClient = new Version3Client({
      host: jiraHost,
      authentication: {
        basic: {
          email: jiraEmail,
          apiToken: jiraToken,
        },
      },
    });

    return {
      success: true,
    };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export default getSprints;
