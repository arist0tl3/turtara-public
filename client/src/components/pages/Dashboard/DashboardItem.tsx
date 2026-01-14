import { Card, CardContent, Grid } from '@mui/joy';
import { useTheme } from '../../../theme/ThemeProvider';

interface DashboardItemProps {
  width?: 'full' | 'half' | 'third';
  children: React.ReactNode;
}

const DashboardItem = ({ width = 'third', children }: DashboardItemProps) => {
  const { theme } = useTheme();
  const gridMap = {
    full: 12,
    half: 6,
    third: 4,
  };

  return (
    <Card
      variant="plain"
      sx={{
        height: '100%',
        bgcolor: theme.dashboard.itemBackground,
        '--Card-padding': '1rem',
        border: 'none',
        borderRadius: 'sm',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardItem; 