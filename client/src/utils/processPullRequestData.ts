import moment from 'moment';
import { PullRequest } from '../generated';

export const processPullRequestData = (pullRequests: PullRequest[]) => {
  const last90Days = moment().subtract(90, 'days');
  const thirtyDaysAgo = moment().subtract(30, 'days');
  const sixtyDaysAgo = moment().subtract(60, 'days');

  const data = {
    authored: { total: 0, additions: 0, deletions: 0 },
    reviewed: { total: 0, additions: 0, deletions: 0 },
    chunks: [
      { period: 'Last 30 Days', authored: { total: 0, additions: 0, deletions: 0 }, reviewed: { total: 0, additions: 0, deletions: 0 } },
      { period: '30-60 Days Ago', authored: { total: 0, additions: 0, deletions: 0 }, reviewed: { total: 0, additions: 0, deletions: 0 } },
      { period: '60-90 Days Ago', authored: { total: 0, additions: 0, deletions: 0 }, reviewed: { total: 0, additions: 0, deletions: 0 } },
    ],
  };

  pullRequests.forEach((pr) => {
    const mergedAt = moment(pr.mergedAt);
    const isAuthored = pr.role === 'author';
    const isReviewed = pr.role === 'reviewer';

    if (mergedAt.isAfter(last90Days)) {
      if (isAuthored) {
        data.authored.total += 1;
        data.authored.additions += pr.additions || 0;
        data.authored.deletions += pr.deletions || 0;

        if (mergedAt.isAfter(thirtyDaysAgo)) {
          data.chunks[0].authored.total += 1;
          data.chunks[0].authored.additions += pr.additions || 0;
          data.chunks[0].authored.deletions += pr.deletions || 0;
        } else if (mergedAt.isAfter(sixtyDaysAgo)) {
          data.chunks[1].authored.total += 1;
          data.chunks[1].authored.additions += pr.additions || 0;
          data.chunks[1].authored.deletions += pr.deletions || 0;
        } else {
          data.chunks[2].authored.total += 1;
          data.chunks[2].authored.additions += pr.additions || 0;
          data.chunks[2].authored.deletions += pr.deletions || 0;
        }
      }

      if (isReviewed) {
        data.reviewed.total += 1;
        data.reviewed.additions += pr.additions || 0;
        data.reviewed.deletions += pr.deletions || 0;

        if (mergedAt.isAfter(thirtyDaysAgo)) {
          data.chunks[0].reviewed.total += 1;
          data.chunks[0].reviewed.additions += pr.additions || 0;
          data.chunks[0].reviewed.deletions += pr.deletions || 0;
        } else if (mergedAt.isAfter(sixtyDaysAgo)) {
          data.chunks[1].reviewed.total += 1;
          data.chunks[1].reviewed.additions += pr.additions || 0;
          data.chunks[1].reviewed.deletions += pr.deletions || 0;
        } else {
          data.chunks[2].reviewed.total += 1;
          data.chunks[2].reviewed.additions += pr.additions || 0;
          data.chunks[2].reviewed.deletions += pr.deletions || 0;
        }
      }
    }
  });

  return data;
};
