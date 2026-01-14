import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/joy';
import { Interweave } from 'interweave';
import moment from 'moment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';

interface FeedbackTabProps {
  personId: string;
  feedback: Array<{
    _id: string;
    createdAt: string;
    content: string;
  }>;
}

export default function FeedbackTab({ personId, feedback }: FeedbackTabProps) {
  const { theme } = useTheme();
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

  const currentFeedback = feedback[currentFeedbackIndex];
  const hasMultipleFeedback = feedback.length > 1;
  const isOldestFeedback = currentFeedbackIndex === feedback.length - 1;
  const isNewestFeedback = currentFeedbackIndex === 0;

  const handlePrevFeedback = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isNewestFeedback) {
      setCurrentFeedbackIndex((prev) => prev - 1);
    }
  };

  const handleNextFeedback = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOldestFeedback) {
      setCurrentFeedbackIndex((prev) => prev + 1);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        {feedback.length > 0 ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography level="title-md" sx={{ color: theme.text.primary }}>
                  {moment(currentFeedback.createdAt).format('MMM D, YYYY')}
                </Typography>
              </Box>

              {hasMultipleFeedback && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={handlePrevFeedback}
                    disabled={isNewestFeedback}
                    sx={{
                      bgcolor: theme.person.cardBackground,
                      color: theme.text.primary,
                      '&:hover': !isNewestFeedback && { bgcolor: theme.person.cardHoverBackground },
                      '&.Mui-disabled': {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextFeedback}
                    disabled={isOldestFeedback}
                    sx={{
                      bgcolor: theme.person.cardBackground,
                      color: theme.text.primary,
                      '&:hover': !isOldestFeedback && { bgcolor: theme.person.cardHoverBackground },
                      '&.Mui-disabled': {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Card
              variant="plain"
              sx={{
                bgcolor: theme.person.cardBackground,
                border: 'none',
                '--Card-padding': '1rem',
              }}
            >
              <CardContent
                sx={{
                  bgcolor: theme.person.cardHoverBackground,
                  color: theme.text.primary,
                }}
              >
                <Box
                  sx={{
                    color: theme.text.primary,
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <Interweave content={currentFeedback.content} />
                </Box>
              </CardContent>
            </Card>
          </>
        ) : (
          <Typography level="body-md" sx={{ color: theme.text.primary }}>
            No feedback yet
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
