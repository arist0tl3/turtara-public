import { Typography, Table, Box, Stack, Tooltip } from '@mui/joy';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { processPullRequestData } from '../../../utils/processPullRequestData';
import { GithubData } from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';

interface ScoreWithDeltaProps {
  label: string;
  score: number;
  delta?: number;
}

function ScoreWithDelta({ label, score, delta }: ScoreWithDeltaProps) {
  const { theme } = useTheme();

  const isNoChange = delta === undefined || delta === 0;
  const isPositive = delta > 0;
  const color = isNoChange ? theme.text.secondary : isPositive ? theme.colors.success : theme.colors.danger;
  const Icon = isNoChange ? RemoveIcon : isPositive ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
      <Typography level="body-xs" sx={{ color: theme.text.secondary }}>
        {label}:
      </Typography>
      <Typography
        level={label === 'Overall' ? 'h3' : 'body-md'}
        sx={{ color: theme.text.primary, fontWeight: label === 'Overall' ? 'bold' : 'medium' }}
      >
        {Math.round(score)}
      </Typography>
      <Tooltip title={isNoChange ? 'No change' : `${isPositive ? '+' : ''}${delta.toFixed(1)} from last check in`} variant="solid">
        <Icon
          sx={{
            color,
            fontSize: label === 'Overall' ? 24 : 20,
            opacity: isNoChange ? 0.5 : 1,
          }}
        />
      </Tooltip>
    </Box>
  );
}

interface PullRequestStatsCardProps {
  githubData: GithubData;
}

const PullRequestStatsCard = ({ githubData }: PullRequestStatsCardProps) => {
  const { theme } = useTheme();
  const data = processPullRequestData(githubData?.pullRequests || []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography level="h4" sx={{ color: theme.text.primary }}>
          Pull Request Statistics
        </Typography>
        <Stack spacing={0.5} alignItems="flex-end">
          <ScoreWithDelta label="Overall" score={githubData?.githubScore?.total || 0} delta={githubData?.githubScore?.totalDelta || 0} />
          <ScoreWithDelta label="Author" score={githubData?.githubScore?.author || 0} delta={githubData?.githubScore?.authorDelta || 0} />
          <ScoreWithDelta
            label="Reviewer"
            score={githubData?.githubScore?.reviewer || 0}
            delta={githubData?.githubScore?.reviewerDelta || 0}
          />
        </Stack>
      </Box>

      <Typography sx={{ color: theme.text.primary }}>Total Authored PRs: {data.authored.total}</Typography>
      <Typography sx={{ color: theme.text.primary }}>Total Reviewed PRs: {data.reviewed.total}</Typography>
      <Typography sx={{ color: theme.text.primary }}>
        Total Lines of Code Authored: {data.authored.additions + data.authored.deletions}
      </Typography>
      <Typography sx={{ color: theme.text.primary }}>
        Total Lines of Code Reviewed: {data.reviewed.additions + data.reviewed.deletions}
      </Typography>

      {/* Table for 30/60/90 day data */}
      <Table
        sx={{
          width: '100%',
          marginTop: '16px',
          borderCollapse: 'collapse',
          '& th': {
            color: theme.dashboard.background,
          },
          '& td': {
            color: theme.text.primary,
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Period</th>
            <th style={{ textAlign: 'left' }}>Authored PRs</th>
            <th style={{ textAlign: 'left' }}>Reviewed PRs</th>
          </tr>
        </thead>
        <tbody>
          {data.chunks.map((chunk, index) => (
            <tr key={index}>
              <td>{chunk.period}</td>
              <td>{chunk.authored.total}</td>
              <td>{chunk.reviewed.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PullRequestStatsCard;
