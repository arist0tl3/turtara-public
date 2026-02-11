import { Box, Grid, Typography } from '@mui/joy';
import { useTheme } from '../../../theme/ThemeProvider';
import { useDashboardQuery } from '../../../generated';
import TodoList from './TodoList';
import OutstandingMeetingReports from './OutstandingMeetingReports';

export default function Dashboard() {
  const { theme } = useTheme();
  const { data } = useDashboardQuery({
    fetchPolicy: 'network-only',
  });

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const { outstandingMeetingReports } = data.dashboard;

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.dashboard.background,
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <Typography level="h2" sx={{ mb: 3, color: theme.text.primary }}>
        Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid xs={12} md={6}>
          <Box
            sx={{
              height: '100%',
              bgcolor: theme.dashboard.itemBackground,
              borderRadius: 'sm',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              p: 2,
            }}
          >
            <TodoList />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Box
            sx={{
              height: '100%',
              bgcolor: theme.dashboard.itemBackground,
              borderRadius: 'sm',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              p: 2,
            }}
          >
            <OutstandingMeetingReports reports={outstandingMeetingReports} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
