import { Box } from '@mui/joy';
import EditPerson from '../../EditPerson';

export default function DetailsTab() {
  return (
    <Box sx={{ maxWidth: 'md' }}>
      <EditPerson />
    </Box>
  );
}
