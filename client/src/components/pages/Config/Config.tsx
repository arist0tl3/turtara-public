import { Box, Button, Card, FormControl, FormLabel, Input, Typography, Grid } from '@mui/joy';
import { useState } from 'react';
import { useCurrentUserQuery, useUpdateCurrentUserMutation } from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';

export default function Config() {
  const { theme } = useTheme();
  const { data: currentUserData, loading: currentUserLoading } = useCurrentUserQuery();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [updateCurrentUser] = useUpdateCurrentUserMutation({
    refetchQueries: ['CurrentUser'],
    onCompleted: () => {
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    },
  });

  const handleUpdateCurrentUserSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const jiraHost = (e.target as HTMLFormElement).jiraHost.value;
    const jiraEmail = (e.target as HTMLFormElement).jiraEmail.value;
    const jiraToken = (e.target as HTMLFormElement).jiraToken.value;
    const githubToken = (e.target as HTMLFormElement).githubToken.value;
    const githubOrganization = (e.target as HTMLFormElement).githubOrganization.value;

    updateCurrentUser({
      variables: {
        input: {
          jiraHost,
          jiraEmail,
          jiraToken,
          githubToken,
          githubOrganization,
        },
      },
    });
  };

  const handleAddJIRAColumnGroupClick = () => {
    // Implement JIRA column group functionality
  };

  if (currentUserLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: '800px', margin: '0 auto' }}>
      <Typography level="h2" sx={{ mb: 3, color: theme.text.primary }}>
        System Configuration
      </Typography>

      <Card
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          bgcolor: theme.colors.formCard.background,
          borderColor: theme.colors.formCard.border,
        }}
      >
        <Typography level="h4" sx={{ mb: 3, color: theme.text.primary }}>
          Integration Settings
        </Typography>

        {updateSuccess && (
          <Box
            sx={{
              p: 2,
              mb: 3,
              bgcolor: 'success.softBg',
              color: 'success.solidColor',
              borderRadius: 'sm',
            }}
          >
            Settings updated successfully!
          </Box>
        )}

        <form onSubmit={handleUpdateCurrentUserSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography level="title-md" sx={{ mb: 2, color: theme.text.primary }}>
                Jira Settings
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel sx={{ color: theme.text.secondary }}>Jira Host</FormLabel>
                <Input
                  name="jiraHost"
                  id="jiraHost"
                  type="text"
                  defaultValue={currentUserData?.currentUser?.jiraHost || ''}
                  sx={{
                    bgcolor: theme.colors.inputBackground,
                    color: theme.text.primary,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel sx={{ color: theme.text.secondary }}>Jira Email</FormLabel>
                <Input
                  name="jiraEmail"
                  id="jiraEmail"
                  type="email"
                  defaultValue={currentUserData?.currentUser?.jiraEmail || ''}
                  sx={{
                    bgcolor: theme.colors.inputBackground,
                    color: theme.text.primary,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel sx={{ color: theme.text.secondary }}>Jira Token</FormLabel>
                <Input
                  name="jiraToken"
                  id="jiraToken"
                  type="password"
                  defaultValue={currentUserData?.currentUser?.hasJiraToken ? '****' : ''}
                  sx={{
                    bgcolor: theme.colors.inputBackground,
                    color: theme.text.primary,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <Typography level="title-md" sx={{ mt: 2, mb: 2, color: theme.text.primary }}>
                GitHub Settings
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel sx={{ color: theme.text.secondary }}>GitHub Token</FormLabel>
                <Input
                  name="githubToken"
                  id="githubToken"
                  type="password"
                  defaultValue={currentUserData?.currentUser?.hasGithubToken ? '****' : ''}
                  sx={{
                    bgcolor: theme.colors.inputBackground,
                    color: theme.text.primary,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel sx={{ color: theme.text.secondary }}>GitHub Organization</FormLabel>
                <Input
                  name="githubOrganization"
                  id="githubOrganization"
                  type="text"
                  defaultValue={currentUserData?.currentUser?.githubOrganization || ''}
                  sx={{
                    bgcolor: theme.colors.inputBackground,
                    color: theme.text.primary,
                  }}
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <Typography level="title-md" sx={{ mt: 2, mb: 2, color: theme.text.primary }}>
                Jira Column Management
              </Typography>
            </Grid>

            <Grid xs={12}>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel sx={{ color: theme.text.secondary }}>Add a JIRA Column Group</FormLabel>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Input
                    name="jiraColumnGroup"
                    id="jiraColumnGroup"
                    type="text"
                    sx={{
                      flexGrow: 1,
                      bgcolor: theme.colors.inputBackground,
                      color: theme.text.primary,
                    }}
                  />
                  <Button
                    onClick={handleAddJIRAColumnGroupClick}
                    sx={{
                      bgcolor: theme.person.headerBackground,
                      color: theme.colors.buttonText,
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            sx={{
              mt: 2,
              bgcolor: theme.person.headerBackground,
              color: theme.colors.buttonText,
              '&:hover': {
                bgcolor: theme.colors.buttonPrimary.hover,
              },
            }}
          >
            Save Configuration
          </Button>
        </form>
      </Card>
    </Box>
  );
}
