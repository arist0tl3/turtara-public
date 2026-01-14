import { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, Option, Select } from '@mui/joy';
import styled from 'styled-components';
import { Edit } from '@mui/icons-material';
import Resizer from 'react-image-file-resizer';

import Avatar from '../../Avatar';

import { useTeamQuery, useUpdateTeamMutation } from '../../../generated';
import { onBackground } from '../../../theme/colors';

const Container = styled.div`
  color: ${onBackground};
`;

const Form = styled.form`
  width: 320px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 16px;
  }

  label {
    color: ${onBackground};
  }
`;

const Circle = styled.button`
  width: 128px;
  height: 128px;
  border: 0;
  border-radius: 50%;
  background: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

function EditTeam(): ReactElement {
  const navigate = useNavigate();
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { teamId = '' } = params;

  const [name, setName] = useState<string>('');
  const [profileImageSrc, setProfileImageSrc] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { error, loading } = useTeamQuery({
    onCompleted: (data) => {
      if (data?.team?.name) {
        setName(data.team.name);
      }
      if (data?.team?.profileImageSrc) {
        setProfileImageSrc(data.team.profileImageSrc);
      }
    },
    variables: {
      input: {
        teamId,
      },
    },
  });

  const [updateTeam] = useUpdateTeamMutation({
    onCompleted: (data) => {
      if (data.updateTeam.team?._id) {
        navigate(`/teams/${teamId}`, {
          replace: true,
        });
      }
    },
    variables: {
      input: {
        name,
        profileImageSrc,
        teamId,
      },
    },
  });

  const readyToSubmit = !!name;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      updateTeam();
    }
  };

  const handleProfileImageFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    if (!event.currentTarget.files) return;

    if (event !== null && (event.currentTarget as HTMLInputElement) && (event.currentTarget as HTMLInputElement)?.files?.[0]) {
      setSelectedFile(event.currentTarget.files[0]);
    }
  };

  const simulateFileInputClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (selectedFile) {
      resizeFile(selectedFile).then((res) => setProfileImageSrc(res as string));
    }
  }, [resizeFile, selectedFile]);

  if (error) return <div>{`Error: ${error}`}</div>;
  if (loading) return <div />;

  return (
    <Container>
      <h1>{'Edit Team'}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          {!!profileImageSrc && (
            <>
              <Avatar onClick={() => simulateFileInputClick()} src={profileImageSrc} />
              <input
                type={'file'}
                accept={'.jpg, .jpeg, .png'}
                ref={fileInputRef}
                onChange={(e) => handleProfileImageFileChange(e)}
                style={{ display: 'none' }}
              />
            </>
          )}
          {!profileImageSrc && (
            <>
              <Circle onClick={() => simulateFileInputClick()} type={'button'}>
                <Edit />
              </Circle>
              <input
                type={'file'}
                accept={'.jpg, .jpeg, .png'}
                ref={fileInputRef}
                onChange={(e) => handleProfileImageFileChange(e)}
                style={{ display: 'none' }}
              />
            </>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>{'Name'}</FormLabel>
          <Input autoComplete={'false'} id={'Name'} value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </FormControl>

        <Button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </Button>
      </Form>
    </Container>
  );
}

export default EditTeam;
