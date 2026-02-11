import { useState } from 'react';
import { Box, Button, Card, FormControl, FormLabel, Input, Typography, Switch, Select, Option, Modal, Divider, Grid } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import WorkIcon from '@mui/icons-material/Work';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  usePeopleByCurrentUserQuery,
  useRolesByCurrentUserQuery,
  useTeamsByCurrentUserQuery,
  useCreatePersonMutation,
  useCreateTeamMutation,
  useCreateRoleMutation,
} from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { theme } = useTheme();
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const [isDirectReport, setIsDirectReport] = useState(false);
  const [teamValue, setTeamValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { data: peopleData, loading: peopleLoading, refetch: refetchPeople } = usePeopleByCurrentUserQuery();
  const { data: teamsData, loading: teamsLoading, refetch: refetchTeams } = useTeamsByCurrentUserQuery();
  const { data: rolesData, loading: rolesLoading, refetch: refetchRoles } = useRolesByCurrentUserQuery();

  const [createPerson] = useCreatePersonMutation({
    onCompleted: () => {
      resetForm();
      refetchPeople();
      setAddPersonOpen(false);
      showSuccessMessage('Person added successfully!');
    },
  });

  const [createTeam] = useCreateTeamMutation({
    onCompleted: (data) => {
      setNewTeamName('');
      refetchTeams();
      setAddTeamOpen(false);
      setTeamValue(data.createTeam.team?._id || '');
      showSuccessMessage('Team added successfully!');
    },
  });

  const [createRole] = useCreateRoleMutation({
    onCompleted: (data) => {
      setNewRoleName('');
      refetchRoles();
      setAddRoleOpen(false);
      setRoleValue(data.createRole.role?._id || '');
      showSuccessMessage('Role added successfully!');
    },
  });

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setTeamValue('');
    setRoleValue('');
    setIsDirectReport(false);
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      createTeam({
        variables: {
          input: { name: newTeamName.trim() },
        },
      });
    }
  };

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      createRole({
        variables: {
          input: { name: newRoleName.trim() },
        },
      });
    }
  };

  const handleCreatePerson = () => {
    if (firstName.trim() && lastName.trim()) {
      createPerson({
        variables: {
          input: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            teamId: teamValue || undefined,
            roleId: roleValue || undefined,
            reportsToMe: isDirectReport,
          },
        },
      });
    }
  };

  const teams = teamsData?.teamsByCurrentUser || [];
  const roles = rolesData?.rolesByCurrentUser || [];
  const people = peopleData?.peopleByCurrentUser || [];
  const isLoading = peopleLoading || teamsLoading || rolesLoading;
  const hasNoData = !isLoading && people.length === 0 && teams.length === 0 && roles.length === 0;

  return (
    <Box sx={{ p: 3 }}>
      {successMessage && (
        <Box
          sx={{
            p: 2,
            mb: 3,
            bgcolor: 'success.softBg',
            color: 'success.solidColor',
            borderRadius: 'sm',
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 1000,
            boxShadow: 'md',
          }}
        >
          {successMessage}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography level="h2" sx={{ color: theme.text.primary }}>
          {hasNoData ? "Welcome! Let's Get Started" : 'Team Management'}
        </Typography>

        <Button
          variant="solid"
          startDecorator={<PersonAddIcon />}
          onClick={() => setAddPersonOpen(true)}
          sx={{
            bgcolor: theme.person.headerBackground,
            color: theme.colors.buttonText,
            '&:hover': {
              bgcolor: theme.colors.buttonPrimary.hover,
            },
          }}
        >
          Add Person
        </Button>
      </Box>

      {hasNoData ? (
        <Card
          variant="outlined"
          sx={{
            p: 3,
            mb: 4,
            bgcolor: theme.colors.formCard.background,
            borderColor: theme.colors.formCard.border,
          }}
        >
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <SupervisorAccountIcon sx={{ fontSize: 60, color: theme.text.secondary, mb: 2 }} />
            <Typography level="h4" sx={{ mb: 2, color: theme.text.primary }}>
              Start by adding your team members
            </Typography>
            <Typography sx={{ mb: 3, color: theme.text.secondary, maxWidth: '600px', mx: 'auto' }}>
              To get the most out of this platform, start by adding people, teams, and roles. You can then run regular check-ins, manage
              goals, and keep one-on-ones organized.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startDecorator={<GroupAddIcon />}
                onClick={() => setAddTeamOpen(true)}
                sx={{
                  color: theme.text.primary,
                  borderColor: theme.text.primary,
                  '&:hover': {
                    borderColor: theme.text.primary,
                    bgcolor: theme.colors.inputBackground,
                  },
                }}
              >
                Create Team
              </Button>
              <Button
                variant="outlined"
                startDecorator={<WorkIcon />}
                onClick={() => setAddRoleOpen(true)}
                sx={{
                  color: theme.text.primary,
                  borderColor: theme.text.primary,
                  '&:hover': {
                    borderColor: theme.text.primary,
                    bgcolor: theme.colors.inputBackground,
                  },
                }}
              >
                Create Role
              </Button>
            </Box>
          </Box>
        </Card>
      ) : (
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                bgcolor: theme.colors.formCard.background,
                borderColor: theme.colors.formCard.border,
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: theme.text.primary }}>
                  People ({people.length})
                </Typography>
                <Button
                  variant="plain"
                  startDecorator={<AddIcon />}
                  onClick={() => setAddPersonOpen(true)}
                  sx={{ color: theme.text.primary }}
                >
                  Add
                </Button>
              </Box>
              <Divider />
              <Box sx={{ p: 2, maxHeight: '300px', overflowY: 'auto' }}>
                {people.length > 0 ? (
                  people.map((person) => (
                    <Box
                      key={person._id}
                      component={Link}
                      to={`/people/${person._id}`}
                      sx={{
                        display: 'flex',
                        p: 1,
                        borderRadius: 'sm',
                        textDecoration: 'none',
                        color: theme.text.primary,
                        '&:hover': {
                          bgcolor: theme.colors.inputBackground,
                        },
                      }}
                    >
                      <Typography>
                        {person.firstName} {person.lastName}
                        {person.reportsToMe && (
                          <Typography
                            component="span"
                            sx={{
                              ml: 1,
                              px: 1,
                              py: 0.5,
                              fontSize: '0.75rem',
                              bgcolor: 'primary.softBg',
                              color: 'primary.solidColor',
                              borderRadius: 'sm',
                            }}
                          >
                            Reports to me
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: theme.text.secondary, textAlign: 'center', py: 2 }}>No people added yet</Typography>
                )}
              </Box>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                bgcolor: theme.colors.formCard.background,
                borderColor: theme.colors.formCard.border,
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: theme.text.primary }}>
                  Teams ({teams.length})
                </Typography>
                <Button
                  variant="plain"
                  startDecorator={<AddIcon />}
                  onClick={() => setAddTeamOpen(true)}
                  sx={{ color: theme.text.primary }}
                >
                  Add
                </Button>
              </Box>
              <Divider />
              <Box sx={{ p: 2, maxHeight: '300px', overflowY: 'auto' }}>
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <Box
                      key={team._id}
                      component={Link}
                      to={`/teams/${team._id}`}
                      sx={{
                        display: 'flex',
                        p: 1,
                        borderRadius: 'sm',
                        textDecoration: 'none',
                        color: theme.text.primary,
                        '&:hover': {
                          bgcolor: theme.colors.inputBackground,
                        },
                      }}
                    >
                      <Typography>{team.name}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: theme.text.secondary, textAlign: 'center', py: 2 }}>No teams added yet</Typography>
                )}
              </Box>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                bgcolor: theme.colors.formCard.background,
                borderColor: theme.colors.formCard.border,
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h4" sx={{ color: theme.text.primary }}>
                  Roles ({roles.length})
                </Typography>
                <Button
                  variant="plain"
                  startDecorator={<AddIcon />}
                  onClick={() => setAddRoleOpen(true)}
                  sx={{ color: theme.text.primary }}
                >
                  Add
                </Button>
              </Box>
              <Divider />
              <Box sx={{ p: 2, maxHeight: '300px', overflowY: 'auto' }}>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <Box
                      key={role._id}
                      sx={{
                        display: 'flex',
                        p: 1,
                        borderRadius: 'sm',
                        color: theme.text.primary,
                      }}
                    >
                      <Typography>{role.name}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: theme.text.secondary, textAlign: 'center', py: 2 }}>No roles added yet</Typography>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Add Person Modal */}
      <Modal
        open={addPersonOpen}
        onClose={() => setAddPersonOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '90%',
            maxWidth: 500,
            p: 3,
            bgcolor: theme.colors.formCard.background,
            borderColor: theme.colors.formCard.border,
          }}
        >
          <Typography level="h4" sx={{ mb: 2, color: theme.text.primary }}>
            Add a New Person
          </Typography>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>First Name *</FormLabel>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              sx={{
                bgcolor: theme.colors.inputBackground,
                color: theme.text.primary,
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Last Name *</FormLabel>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              sx={{
                bgcolor: theme.colors.inputBackground,
                color: theme.text.primary,
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Team</FormLabel>
            <Select
              value={teamValue}
              onChange={(_, value) => {
                if (value === 'add-new') {
                  setAddTeamOpen(true);
                } else {
                  setTeamValue(value as string);
                }
              }}
              sx={{
                bgcolor: theme.colors.inputBackground,
                color: theme.text.primary,
              }}
            >
              <Option value="">Select a team</Option>
              {teams.map((team) => (
                <Option key={team._id} value={team._id}>
                  {team.name}
                </Option>
              ))}
              <Option value="add-new" sx={{ color: 'primary.500' }}>
                + Add new team
              </Option>
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Role</FormLabel>
            <Select
              value={roleValue}
              onChange={(_, value) => {
                if (value === 'add-new') {
                  setAddRoleOpen(true);
                } else {
                  setRoleValue(value as string);
                }
              }}
              sx={{
                bgcolor: theme.colors.inputBackground,
                color: theme.text.primary,
              }}
            >
              <Option value="">Select a role</Option>
              {roles.map((role) => (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
              <Option value="add-new" sx={{ color: 'primary.500' }}>
                + Add new role
              </Option>
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Switch checked={isDirectReport} onChange={(e) => setIsDirectReport(e.target.checked)} />
            <FormLabel sx={{ color: theme.text.primary, m: 0 }}>This person reports to me</FormLabel>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setAddPersonOpen(false)}
              sx={{
                color: theme.text.primary,
                borderColor: theme.text.primary,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={handleCreatePerson}
              disabled={!firstName.trim() || !lastName.trim()}
              sx={{
                bgcolor: theme.person.headerBackground,
                color: theme.colors.buttonText,
                '&:hover': {
                  bgcolor: theme.colors.buttonPrimary.hover,
                },
                '&.Mui-disabled': {
                  opacity: 0.7,
                  color: theme.colors.buttonDisabledText,
                  bgcolor: theme.colors.buttonDisabledBackground,
                },
              }}
            >
              Add Person
            </Button>
          </Box>
        </Card>
      </Modal>

      {/* Add Team Modal */}
      <Modal
        open={addTeamOpen}
        onClose={() => setAddTeamOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '90%',
            maxWidth: 400,
            p: 3,
            bgcolor: theme.colors.formCard.background,
            borderColor: theme.colors.formCard.border,
          }}
        >
          <Typography level="h4" sx={{ mb: 2, color: theme.text.primary }}>
            Add a New Team
          </Typography>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Team Name *</FormLabel>
            <Input
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              autoFocus
              required
              sx={{
                bgcolor: theme.colors.inputBackground,
                color: theme.text.primary,
              }}
            />
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setAddTeamOpen(false)}
              sx={{
                color: theme.text.primary,
                borderColor: theme.text.primary,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={handleCreateTeam}
              disabled={!newTeamName.trim()}
              sx={{
                bgcolor: theme.person.headerBackground,
                color: theme.colors.buttonText,
                '&:hover': {
                  bgcolor: theme.colors.buttonPrimary.hover,
                },
                '&.Mui-disabled': {
                  opacity: 0.7,
                  color: theme.colors.buttonDisabledText,
                  bgcolor: theme.colors.buttonDisabledBackground,
                },
              }}
            >
              Add Team
            </Button>
          </Box>
        </Card>
      </Modal>

      {/* Add Role Modal */}
      <Modal
        open={addRoleOpen}
        onClose={() => setAddRoleOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '90%',
            maxWidth: 400,
            p: 3,
            bgcolor: theme.colors.formCard.background,
            borderColor: theme.colors.formCard.border,
          }}
        >
          <Typography level="h4" sx={{ mb: 2, color: theme.text.primary }}>
            Add a New Role
          </Typography>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel sx={{ color: theme.text.secondary }}>Role Name *</FormLabel>
            <Input
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              autoFocus
              required
              sx={{
                bgcolor: theme.colors.inputBackground,
                color: theme.text.primary,
              }}
            />
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setAddRoleOpen(false)}
              sx={{
                color: theme.text.primary,
                borderColor: theme.text.primary,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={handleCreateRole}
              disabled={!newRoleName.trim()}
              sx={{
                bgcolor: theme.person.headerBackground,
                color: theme.colors.buttonText,
                '&:hover': {
                  bgcolor: theme.colors.buttonPrimary.hover,
                },
                '&.Mui-disabled': {
                  opacity: 0.7,
                  color: theme.colors.buttonDisabledText,
                  bgcolor: theme.colors.buttonDisabledBackground,
                },
              }}
            >
              Add Role
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
}
