interface PullRequest {
  id: string;
  role: 'author' | 'reviewer';
  additions: number;
  deletions: number;
  createdAt: string;
  mergedAt: string;
  permalink: string;
  reviewCommentCount: number;
  title: string;
}

interface PRScore {
  id: string;
  score: number;
  role: 'author' | 'reviewer';
}

interface EngineerScore {
  total: number;
  author: number;
  reviewer: number;
  prCount: number;
  authorCount: number;
  reviewerCount: number;
  meaningfulReviewRatio: number;
  balanceMultiplier: number;
  prScores: PRScore[];
  percentile?: number;
  zScore?: number;
}

interface EngineerScores {
  [engineer: string]: EngineerScore;
}

function calculateCodeImpactScore(additions: number, deletions: number): number {
  const additionsScore = Math.log2(1 + additions) * 2;
  const deletionsScore = Math.log2(1 + deletions) * 1.5;

  const totalLinesChanged = additions + deletions;

  const sizeMultiplier = totalLinesChanged > 1000 ? Math.max(0.5, 1 - Math.log2(totalLinesChanged / 1000) * 0.1) : 1;

  const balanceFactor = totalLinesChanged > 0 ? 1 + (0.2 * Math.min(additions, deletions)) / totalLinesChanged : 1;

  return (additionsScore + deletionsScore) * balanceFactor * sizeMultiplier;
}

function calculateTimeEfficiencyScore(createdAt: string, mergedAt: string): number {
  if (!createdAt || !mergedAt) return 0;

  const createDate = new Date(createdAt);
  const mergeDate = new Date(mergedAt);

  const hoursToMerge = (mergeDate.getTime() - createDate.getTime()) / (1000 * 60 * 60);

  return Math.max(10 - Math.log2(1 + hoursToMerge / 4), 0);
}

function calculateReviewQualityScore(reviewCommentCount: number, totalLinesChanged: number): number {
  if (reviewCommentCount === 0) return 0;

  if (!Number.isFinite(reviewCommentCount) || !Number.isFinite(totalLinesChanged)) {
    return 0;
  }

  const commentDensity = totalLinesChanged > 0 ? (reviewCommentCount * 100) / totalLinesChanged : reviewCommentCount;

  const score = Math.pow(1 + commentDensity, 0.6);

  if (!Number.isFinite(score)) {
    return 0;
  }

  return score;
}

function scorePullRequest(pr: PullRequest): number {
  const totalLinesChanged = pr.additions + pr.deletions;

  const impactScore = calculateCodeImpactScore(pr.additions, pr.deletions);
  const timeScore = calculateTimeEfficiencyScore(pr.createdAt, pr.mergedAt);

  if (pr.role === 'author') {
    return impactScore * 1.0 + timeScore * 0.5;
  } else if (pr.role === 'reviewer') {
    const reviewCommentCount = pr.reviewCommentCount || 0;
    const reviewQualityScore = calculateReviewQualityScore(reviewCommentCount, totalLinesChanged);

    if (reviewCommentCount === 0) {
      return impactScore * 0.1;
    }

    return impactScore * 0.3 + reviewQualityScore * 1.5;
  }

  return 0;
}

function calculateEngineerScore(pullRequests: PullRequest[]): EngineerScore {
  if (!pullRequests || pullRequests.length === 0) {
    return {
      total: 0,
      author: 0,
      reviewer: 0,
      prCount: 0,
      authorCount: 0,
      reviewerCount: 0,
      meaningfulReviewRatio: 0,
      balanceMultiplier: 1,
      prScores: [],
    };
  }

  const authorPRs = pullRequests.filter((pr) => pr.role === 'author');
  const reviewerPRs = pullRequests.filter((pr) => pr.role === 'reviewer');

  const prScores = pullRequests.map((pr) => ({
    id: pr.id,
    score: scorePullRequest(pr),
    role: pr.role,
  }));

  const authorScore = prScores.filter((ps) => ps.role === 'author').reduce((sum, ps) => sum + ps.score, 0);

  const reviewerScore = prScores.filter((ps) => ps.role === 'reviewer').reduce((sum, ps) => sum + ps.score, 0);

  const meaningfulReviews = reviewerPRs.filter((pr) => pr.reviewCommentCount > 0).length;
  const reviewQualityRatio = reviewerPRs.length > 0 ? meaningfulReviews / reviewerPRs.length : 0;

  const balanceMultiplier =
    authorPRs.length > 0 && reviewerPRs.length > 0
      ? 1 + (0.1 * Math.min(authorPRs.length, reviewerPRs.length)) / Math.max(authorPRs.length, reviewerPRs.length)
      : 1;

  const totalScore = (authorScore * 0.65 + reviewerScore * 0.35) * balanceMultiplier;

  return {
    total: totalScore,
    author: authorScore,
    reviewer: reviewerScore,
    prCount: pullRequests.length,
    authorCount: authorPRs.length,
    reviewerCount: reviewerPRs.length,
    meaningfulReviewRatio: reviewQualityRatio,
    balanceMultiplier: balanceMultiplier,
    prScores: prScores,
  };
}

function compareEngineers(engineerPRs: { [engineer: string]: PullRequest[] }): EngineerScores {
  const scores: EngineerScores = {};

  for (const [engineer, prs] of Object.entries(engineerPRs)) {
    scores[engineer] = calculateEngineerScore(prs);
  }

  const totalScores = Object.values(scores).map((s) => s.total);
  const mean = totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length;

  const variance =
    totalScores.reduce((sum, score) => {
      const diff = score - mean;
      return sum + diff * diff;
    }, 0) / (totalScores.length > 1 ? totalScores.length - 1 : 1);
  const stdev = Math.sqrt(variance);

  for (const engineer in scores) {
    const score = scores[engineer].total;
    scores[engineer].percentile = (totalScores.filter((s) => s <= score).length / totalScores.length) * 100;
    scores[engineer].zScore = stdev > 0 ? (score - mean) / stdev : 0;
  }

  return scores;
}

export { PullRequest, EngineerScore, EngineerScores, calculateEngineerScore, compareEngineers, scorePullRequest };
