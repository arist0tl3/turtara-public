import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Card,
  CardContent,
  Grid,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '../../../theme/ThemeProvider';
import { useCreatePersonNoteMutation, usePersonQuery } from '../../../generated';
import Avatar from '../../Avatar';
import formatName from '../../../utils/formatName';
import NewCheckInForm from './NewCheckInForm';
import EditPerson from '../EditPerson';
import { CheckInsTab, OneOnOneTab, FeedbackTab } from './tabs';

export default function PersonComponent() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { personId = '' } = useParams();
  const [showNewCheckInModal, setShowNewCheckInModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { data, error } = usePersonQuery({
    fetchPolicy: 'network-only',
    variables: { input: { personId } },
  });

  const [createPersonNote] = useCreatePersonNoteMutation({
    onCompleted: (responseData) => {
      if (responseData.createPersonNote.personNote?._id) {
        navigate(`/people/${personId}/notes/${responseData.createPersonNote.personNote._id}`);
      }
    },
  });

  const person = data?.person;
  if (error || !person) return <div>{`Error: ${error}`}</div>;

  const personNotes = person.personNotes || [];
  const checkIns = person.checkIns || [];

  const handleStartClick = () => {
    createPersonNote({ variables: { input: { content: ' ', personId } } });
  };

  const cardStyle = {
    height: '100%',
    bgcolor: theme.person.cardBackground,
    '--Card-padding': '1rem',
    border: 'none',
    borderRadius: 'sm',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        bgcolor: theme.person.background,
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: theme.person.headerBackground,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            size={64}
            src={person.profileImageSrc}
            sx={{ border: '2px solid white' }}
          />
          <Box>
            <Typography level="h3" component="h1">
              {formatName(person)}
            </Typography>
            <Typography level="body-sm">{person.role?.name}</Typography>
            <Typography level="body-sm">{person.team?.name}</Typography>
          </Box>
        </Box>

        <Dropdown>
          <MenuButton variant="solid" color="primary" startDecorator={<AddIcon />}>
            Actions
          </MenuButton>
          <Menu>
            <MenuItem onClick={handleStartClick}>Start 1:1</MenuItem>
            <MenuItem onClick={() => setShowNewCheckInModal(true)}>Add Check In</MenuItem>
            <MenuItem component={Link} to={`/people/${personId}/feedback/new`}>
              Add Feedback
            </MenuItem>
            <MenuItem onClick={() => setShowEditModal(true)}>Edit Details</MenuItem>
          </Menu>
        </Dropdown>
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card variant="plain" sx={cardStyle}>
              <CardContent>
                <Typography level="h4" sx={{ color: theme.text.primary, mb: 2 }}>
                  Recent Check-ins
                </Typography>
                <CheckInsTab checkIns={checkIns} />
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card variant="plain" sx={cardStyle}>
              <CardContent>
                <Typography level="h4" sx={{ color: theme.text.primary, mb: 2 }}>
                  1:1 Notes
                </Typography>
                <OneOnOneTab
                  personId={personId}
                  topics={[]}
                  personNotes={personNotes}
                  onAddTopic={() => {}}
                  onStartOneOnOne={handleStartClick}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card variant="plain" sx={cardStyle}>
              <CardContent>
                <Typography level="h4" sx={{ color: theme.text.primary, mb: 2 }}>
                  Recent Feedback
                </Typography>
                <FeedbackTab personId={personId} feedback={person.feedback.slice(0, 3)} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Modal open={showNewCheckInModal} onClose={() => setShowNewCheckInModal(false)}>
        <ModalDialog
          sx={{
            bgcolor: theme.person.cardBackground,
            color: theme.text.primary,
          }}
        >
          <ModalClose />
          <Typography level="h4" sx={{ mb: 2 }}>
            Start of Week Check In
          </Typography>
          <NewCheckInForm personId={personId} onSuccess={() => setShowNewCheckInModal(false)} />
        </ModalDialog>
      </Modal>

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <ModalDialog
          sx={{
            maxWidth: '800px',
            width: '100%',
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <ModalClose />
          <Typography level="h4" sx={{ mb: 2 }}>
            Edit Details
          </Typography>
          <EditPerson onSuccess={() => setShowEditModal(false)} />
        </ModalDialog>
      </Modal>
    </Box>
  );
}
