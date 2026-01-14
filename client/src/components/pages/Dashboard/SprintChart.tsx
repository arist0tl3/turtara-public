import { Box, Button, Card, Typography } from '@mui/joy';
import { useGetSprintsLazyQuery } from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';

export default function SprintChart() {
  const { theme } = useTheme();
  const [getSprints, { loading, data }] = useGetSprintsLazyQuery();

  const handleFetchSprints = () => {
    getSprints();
  };

  return (
    <Card
      sx={{
        bgcolor: theme.person.cardBackground,
        height: '300px',
        border: 'none',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography level="h4" sx={{ color: theme.text.primary }}>
          Sprint Data
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 60px)' }}>
        <Button
          onClick={handleFetchSprints}
          loading={loading}
          sx={{
            color: theme.text.primary,
            borderColor: theme.text.primary,
            '&:hover': {
              borderColor: theme.text.primary,
            },
          }}
        >
          Fetch Sprint Data
        </Button>
      </Box>
    </Card>
  );
}
