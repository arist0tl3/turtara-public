import { FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input } from '@mui/joy';
import styled from 'styled-components';

import { useCreateRoleMutation } from '../../../generated';

const Form = styled.form`
  width: 320px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 16px;
  }
`;

function NewRole(): ReactElement {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');

  const [createRole] = useCreateRoleMutation({
    onCompleted: (data) => {
      if (data.createRole.role?._id) {
        navigate('/settings', {
          replace: true,
        });
      }
    },
    variables: {
      input: {
        name,
      },
    },
  });

  const readyToSubmit = !!name;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      createRole();
    }
  };

  return (
    <div>
      <h1>{'New Role'}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>{'Name'}</FormLabel>
          <Input autoFocus autoComplete={'false'} id={'name'} value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </FormControl>

        <Button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </Button>
      </Form>
    </div>
  );
}

export default NewRole;
