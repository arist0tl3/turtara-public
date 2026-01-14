import { Box, Button, Card, CardContent, Grid, Stack, Typography, IconButton } from '@mui/joy';
import { Interweave } from 'interweave';
import moment from 'moment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import UnstyledLink from '../../../../styled-components/UnstyledLink';
import { useTheme } from '../../../../theme/ThemeProvider';

interface OneOnOneTabProps {
  personId: string;
  topics: string[];
  personNotes: Array<{
    _id: string;
    createdAt: string;
    content: string;
  }>;
  onAddTopic: () => void;
  onStartOneOnOne: () => void;
}

export default function OneOnOneTab({ personId, topics, personNotes, onAddTopic, onStartOneOnOne }: OneOnOneTabProps) {
  const { theme } = useTheme();
  const hasTopics = topics.length > 0;
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  const currentNote = personNotes[currentNoteIndex];
  const hasMultipleNotes = personNotes.length > 1;
  const isOldestNote = currentNoteIndex === personNotes.length - 1;
  const isNewestNote = currentNoteIndex === 0;

  const handlePrevNote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isNewestNote) {
      setCurrentNoteIndex((prev) => prev - 1);
    }
  };

  const handleNextNote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOldestNote) {
      setCurrentNoteIndex((prev) => prev + 1);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        {hasTopics && (
          <Card
            variant="plain"
            sx={{
              mb: 2,
              bgcolor: theme.person.cardBackground,
              color: theme.text.primary,
              border: 'none',
              '--Card-padding': '1rem',
            }}
          >
            <CardContent>
              <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                {topics.map((topic) => (
                  <Box component="li" key={topic}>
                    <Typography level="body-md" sx={{ color: theme.text.primary }}>
                      {topic}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {personNotes.length > 0 ? (
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
                  {moment(currentNote.createdAt).format('MMM D, YYYY')}
                </Typography>
              </Box>

              {hasMultipleNotes && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={handlePrevNote}
                    disabled={isNewestNote}
                    sx={{
                      bgcolor: theme.person.cardBackground,
                      color: theme.text.primary,
                      '&:hover': !isNewestNote && { bgcolor: theme.person.cardHoverBackground },
                      '&.Mui-disabled': {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextNote}
                    disabled={isOldestNote}
                    sx={{
                      bgcolor: theme.person.cardBackground,
                      color: theme.text.primary,
                      '&:hover': !isOldestNote && { bgcolor: theme.person.cardHoverBackground },
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
                  component={UnstyledLink}
                  to={`/people/${personId}/notes/${currentNote._id}`}
                  sx={{
                    color: theme.text.primary,
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover': {
                      color: theme.text.primary,
                    },
                  }}
                >
                  <Interweave content={currentNote.content} />
                </Box>
              </CardContent>
            </Card>
          </>
        ) : (
          <Typography level="body-md" sx={{ color: theme.text.primary }}>
            No meeting notes yet
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
