import { FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input } from '@mui/joy';
import styled from 'styled-components';

import { useCreatePersonMutation } from '../../../generated';

const Form = styled.form`
  width: 320px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 16px;
  }
`;

function NewPerson(): ReactElement {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [createPerson] = useCreatePersonMutation({
    onCompleted: (data) => {
      if (data.createPerson.person?._id) {
        navigate('/settings', {
          replace: true,
        });
      }
    },
    variables: {
      input: {
        firstName,
        lastName,
      },
    },
  });

  const readyToSubmit = !!firstName && !!lastName;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      createPerson();
    }
  };

  return (
    <div>
      <h1>{'New Person'}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>{'First name'}</FormLabel>
          <Input autoFocus autoComplete={'false'} id={'firstName'} value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>{'Last name'}</FormLabel>
          <Input autoComplete={'false'} id={'lastName'} value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />
        </FormControl>

        <Button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </Button>
      </Form>
    </div>
  );
}

export default NewPerson;
