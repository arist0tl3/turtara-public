import React from 'react';
import { Box, Typography, Card, Divider, Chip, Button, Stack } from '@mui/joy';
import { useTheme } from '../../../theme/ThemeProvider';
import moment from 'moment';
import { CheckIn } from '../../../types';

interface CheckInsTabProps {
  checkIns: CheckIn[];
}

const CheckInsTab: React.FC<CheckInsTabProps> = ({ checkIns }) => {
  const { theme } = useTheme();

  if (!checkIns || checkIns.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography level="body-lg" sx={{ color: theme.text.secondary }}>
          No check-ins available
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {checkIns.map((checkIn) => (
        <Card
          key={checkIn._id}
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: theme.colors.formCard.background,
            borderColor: theme.colors.formCard.border,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography level="title-md" sx={{ color: theme.text.primary }}>
              {moment(checkIn.createdAt).format('MMMM D, YYYY')}
            </Typography>
            <Chip
              size="sm"
              variant="soft"
              color={checkIn.weeklyConfidence >= 7 ? 'success' : checkIn.weeklyConfidence >= 4 ? 'warning' : 'danger'}
            >
              Confidence: {checkIn.weeklyConfidence}/10
            </Chip>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ mb: 2 }}>
            <Typography level="body-sm" sx={{ color: theme.text.secondary, mb: 0.5 }}>
              Weekly Goal:
            </Typography>
            <Typography level="body-md" sx={{ color: theme.text.primary }}>
              {checkIn.weeklyGoal}
            </Typography>
          </Box>

          {checkIn.weeklyConfidenceReason && (
            <Box sx={{ mb: 2 }}>
              <Typography level="body-sm" sx={{ color: theme.text.secondary, mb: 0.5 }}>
                Confidence Reason:
              </Typography>
              <Typography level="body-md" sx={{ color: theme.text.primary }}>
                {checkIn.weeklyConfidenceReason}
              </Typography>
            </Box>
          )}

          {checkIn.meetingRequested && (
            <Box sx={{ mt: 2 }}>
              <Chip color="warning" variant="soft" sx={{ mb: 1 }}>
                Meeting Requested
              </Chip>
              {checkIn.meetingRequestedReasons && checkIn.meetingRequestedReasons.length > 0 && (
                <Box>
                  <Typography level="body-sm" sx={{ color: theme.text.secondary, mb: 0.5 }}>
                    Reasons:
                  </Typography>
                  <ul style={{ margin: '0', paddingLeft: '20px' }}>
                    {checkIn.meetingRequestedReasons.map((reason, index) => (
                      <li key={index}>
                        <Typography level="body-md" sx={{ color: theme.text.primary }}>
                          {reason}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              size="sm"
              variant="outlined"
              sx={{
                color: theme.text.primary,
                borderColor: theme.colors.border.subtle,
                '&:hover': {
                  bgcolor: theme.colors.inputBackground,
                  borderColor: theme.colors.border.medium,
                },
              }}
            >
              View Details
            </Button>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

export default CheckInsTab; 