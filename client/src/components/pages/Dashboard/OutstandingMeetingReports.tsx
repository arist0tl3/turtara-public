import { Box, Typography, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator } from '@mui/joy';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Avatar from '../../Avatar';
import { OutstandingMeetingReport } from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';
import formatName from '../../../utils/formatName';

interface OutstandingMeetingReportsProps {
  reports: OutstandingMeetingReport[];
}

const OutstandingMeetingReports = ({ reports }: OutstandingMeetingReportsProps) => {
  const { theme } = useTheme();

  return (
    <Box>
      <Typography
        level="h4"
        component="h2"
        sx={{
          color: theme.text.primary,
          mb: 2,
        }}
      >
        Outstanding 1:1s
      </Typography>

      <List>
        {reports.map((report) => (
          <ListItem key={report._id}>
            <ListItemButton
              component={Link}
              to={`/people/${report._id}?selectedTab=1%3A1s`}
              sx={{
                borderRadius: 'sm',
                color: theme.text.primary,
                '&:hover': {
                  bgcolor: theme.colors.softBackground.default,
                },
              }}
            >
              <ListItemDecorator>
                {report.profileImageSrc && <Avatar size={32} src={report.profileImageSrc} alt={`${report.firstName} ${report.lastName}`} />}
              </ListItemDecorator>

              <ListItemContent>
                <Typography level="body-sm">
                  {report.firstName} {report.lastName}
                </Typography>
              </ListItemContent>

              {report.lastMeetingDate && (
                <Typography level="body-sm" sx={{ color: theme.text.secondary }}>
                  {moment(report.lastMeetingDate).format('MM/DD')}
                </Typography>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OutstandingMeetingReports;
