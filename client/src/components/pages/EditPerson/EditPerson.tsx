import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, FormControl, FormLabel, Input, Option, Select, Box, Typography } from '@mui/joy';
import { Edit } from '@mui/icons-material';
import Resizer from 'react-image-file-resizer';
import Avatar from '../../Avatar';
import { usePersonQuery, useRolesByCurrentUserQuery, useTeamsByCurrentUserQuery, useUpdatePersonMutation } from '../../../generated';
import { useTheme } from '../../../theme/ThemeProvider';

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      128,
      128,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });

interface EditPersonProps {
  onSuccess?: () => void;
}

function EditPerson({ onSuccess }: EditPersonProps) {
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { personId = '' } = params;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [partners, setPartners] = useState<string>('');
  const [kids, setKids] = useState<string>('');
  const [pets, setPets] = useState<string>('');
  const [profileImageSrc, setProfileImageSrc] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [teamId, setTeamId] = useState<string>('');
  const [githubHandle, setGithubHandle] = useState<string>('');
  const [roleId, setRoleId] = useState<string>('');
  const [reportsToMe, setReportsToMe] = useState<boolean>(false);

  const { theme } = useTheme();
  const { error: rolesError, loading: rolesLoading, data: rolesData } = useRolesByCurrentUserQuery();
  const roles = rolesData?.rolesByCurrentUser || [];

  const { error: teamsError, loading: teamsLoading, data: teamsData } = useTeamsByCurrentUserQuery();
  const teams = teamsData?.teamsByCurrentUser || [];

  const { error, loading } = usePersonQuery({
    onCompleted: (data) => {
      if (data?.person) {
        setFirstName(data.person.firstName);
        setLastName(data.person.lastName);
        setGithubHandle(data.person.githubHandle || '');
        setKids(data.person.kids || '');
        setPartners(data.person.partners || '');
        setPets(data.person.pets || '');
        setProfileImageSrc(data.person.profileImageSrc || '');
        setTeamId(data.person.team?._id || '');
        setRoleId(data.person.role?._id || '');
        setReportsToMe(data.person.reportsToMe || false);
      }
    },
    variables: {
      input: {
        personId,
      },
    },
  });

  const [updatePerson] = useUpdatePersonMutation({
    onCompleted: (data) => {
      if (data.updatePerson.person?._id) {
        onSuccess?.();
      }
    },
    variables: {
      input: {
        firstName,
        lastName,
        personId,
        kids,
        pets,
        partners,
        profileImageSrc,
        teamId,
        githubHandle,
        roleId,
        reportsToMe,
      },
    },
  });

  const readyToSubmit = !!firstName && !!lastName;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (readyToSubmit) {
      updatePerson();
    }
  };

  const handleProfileImageFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.files) {
      setSelectedFile(event.currentTarget.files[0]);
    }
  };

  const simulateFileInputClick = (): void => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (selectedFile) {
      resizeFile(selectedFile).then((res) => setProfileImageSrc(res as string));
    }
  }, [selectedFile]);

  const handleTeamSelectChange = (selectedTeamId: string | null): void => {
    setTeamId(selectedTeamId || '');
  };

  const handleRoleSelectChange = (selectedRoleId: string | null): void => {
    setRoleId(selectedRoleId || '');
  };

  const textFields = [
    { name: 'firstName', label: 'First Name', value: firstName, onChange: setFirstName },
    { name: 'lastName', label: 'Last Name', value: lastName, onChange: setLastName },
    { name: 'githubHandle', label: 'Github Handle', value: githubHandle, onChange: setGithubHandle },
    { name: 'partners', label: 'Partners', value: partners, onChange: setPartners },
    { name: 'kids', label: 'Kids', value: kids, onChange: setKids },
    { name: 'pets', label: 'Pets', value: pets, onChange: setPets },
  ];

  if (error || teamsError || rolesError) return <div>{`Error: ${error}`}</div>;
  if (loading || teamsLoading || rolesLoading) return <div />;

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        bgcolor: theme.person.cardBackground,
        borderRadius: 'sm',
      }}
    >
      <Typography level="h4" sx={{ mb: 2, color: theme.text.primary }}>
        Edit Person
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <FormControl sx={{ mb: 2 }}>
          {!!profileImageSrc && (
            <>
              <Avatar onClick={simulateFileInputClick} src={profileImageSrc} />
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                ref={fileInputRef}
                onChange={handleProfileImageFileChange}
                style={{ display: 'none' }}
              />
            </>
          )}
          {!profileImageSrc && (
            <>
              <Button
                onClick={simulateFileInputClick}
                variant="outlined"
                sx={{
                  color: theme.text.primary,
                  borderColor: theme.text.primary,
                  '&:hover': {
                    borderColor: theme.text.primary,
                    bgcolor: theme.colors.inputBackground,
                  },
                }}
              >
                <Edit sx={{ mr: 1 }} /> Upload Image
              </Button>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                ref={fileInputRef}
                onChange={handleProfileImageFileChange}
                style={{ display: 'none' }}
              />
            </>
          )}
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ color: theme.text.primary }}>Team</FormLabel>
          <Select
            value={teamId}
            onChange={(e, value) => handleTeamSelectChange(value)}
            sx={{
              color: theme.text.primary,
              bgcolor: theme.colors.inputBackground,
              '--Select-placeholderColor': theme.text.secondary,
              '--Select-decoratorColor': theme.text.secondary,
              border: `1px solid ${theme.colors.formCard.border}`,
              '&:hover': {
                bgcolor: theme.colors.inputBackground,
              },
              '&:focus-within': {
                bgcolor: theme.colors.inputBackground,
                borderColor: theme.person.headerBackground,
              },
            }}
          >
            {teams.map((team) => (
              <Option key={team._id} value={team._id}>
                {team.name}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ color: theme.text.primary }}>Role</FormLabel>
          <Select
            value={roleId}
            onChange={(e, value) => handleRoleSelectChange(value)}
            sx={{
              color: theme.text.primary,
              bgcolor: theme.colors.inputBackground,
              '--Select-placeholderColor': theme.text.secondary,
              '--Select-decoratorColor': theme.text.secondary,
              border: `1px solid ${theme.colors.formCard.border}`,
              '&:hover': {
                bgcolor: theme.colors.inputBackground,
              },
              '&:focus-within': {
                bgcolor: theme.colors.inputBackground,
                borderColor: theme.person.headerBackground,
              },
            }}
          >
            {roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel sx={{ color: theme.text.primary }}>Reports to me</FormLabel>
          <Checkbox
            checked={reportsToMe}
            onChange={(e) => setReportsToMe(e.target.checked)}
            sx={{
              color: theme.text.primary,
              '--Checkbox-trackBackground': theme.colors.inputBackground,
              '&.Mui-checked': {
                color: theme.person.headerBackground,
              },
            }}
          />
        </FormControl>

        {textFields.map((field) => (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel sx={{ color: theme.text.primary }}>{field.label}</FormLabel>
            <Input
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              sx={{
                color: theme.text.primary,
                bgcolor: theme.colors.inputBackground,
                '--Input-decoratorColor': theme.text.secondary,
                '--Input-placeholderColor': theme.text.secondary,
                border: `1px solid ${theme.colors.formCard.border}`,
                '&:hover': {
                  bgcolor: theme.colors.inputBackground,
                },
                '&:focus-within': {
                  bgcolor: theme.colors.inputBackground,
                  borderColor: theme.person.headerBackground,
                },
              }}
            />
          </FormControl>
        ))}

        <Button
          disabled={!readyToSubmit}
          type="submit"
          fullWidth
          sx={{
            color: theme.colors.buttonText,
            bgcolor: theme.person.headerBackground,
            '&:hover': {
              bgcolor: theme.colors.buttonPrimary.hover,
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              color: theme.colors.buttonText,
            },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default EditPerson;
