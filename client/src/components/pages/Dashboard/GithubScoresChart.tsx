import { Box, Button, Card, Stack, Typography } from '@mui/joy';
import { Scatter } from 'react-chartjs-2';
import { usePeopleByCurrentUserQuery, useUpdateGithubDataMutation } from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import RefreshIcon from '@mui/icons-material/Refresh';

ChartJS.register(LinearScale, PointElement, LineElement, ChartTooltip, Legend);

export default function GithubScoresChart() {
  const { theme } = useTheme();
  const { data: peopleData } = usePeopleByCurrentUserQuery();
  const [updateGithubData, { loading: isUpdating }] = useUpdateGithubDataMutation({
    refetchQueries: ['PeopleByCurrentUser'],
  });

  const textColor = theme.text.primary;
  const gridColor = theme.text.primary;

  console.log({
    textColor,
    gridColor,
  });

  const scatterData = {
    datasets: [
      {
        label: 'Team GitHub Scores',
        data:
          peopleData?.peopleByCurrentUser
            ?.filter((person) => person.githubData?.githubScore)
            .map((person) => ({
              x: person.githubData?.githubScore?.author || 0,
              y: person.githubData?.githubScore?.reviewer || 0,
              name: `${person.firstName} ${person.lastName}`,
            })) || [],
        backgroundColor: theme.charts.colors.points,
        borderColor: theme.charts.colors.pointBorder,
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Author Score',
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Reviewer Score',
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        backgroundColor: theme.dashboard.cardBackground,
        titleColor: textColor,
        bodyColor: textColor,
        callbacks: {
          // @ts-expect-error
          label: (context: any) => {
            const point = context.raw;
            return [`${point.name}`, `Author: ${point.x}, Reviewer: ${point.y}`];
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const handleRefresh = async () => {
    try {
      await updateGithubData();
    } catch (error) {
      console.error('Error updating GitHub data:', error);
    }
  };

  if (isUpdating) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography sx={{ color: theme.text.secondary }}>Updating GitHub data...</Typography>
      </Box>
    );
  }

  return (
    <Card
      sx={{
        bgcolor: theme.dashboard.cardBackground,
        height: '400px',
        border: 'none',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography level="h4" sx={{ color: theme.text.primary }}>
          Team GitHub Scores
        </Typography>
        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Button
            variant="outlined"
            startDecorator={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{
              color: theme.text.primary,
              borderColor: theme.text.primary,
              '&:hover': {
                borderColor: theme.text.primary,
                bgcolor: theme.colors.softBackground.default,
              },
            }}
          >
            Refresh
          </Button>
        </Stack>
      </Box>
      <Box sx={{ height: 'calc(100% - 80px)' }}>
        <Scatter data={scatterData} options={chartOptions} />
      </Box>
    </Card>
  );
}
