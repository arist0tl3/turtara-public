import { FormEvent, useRef, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormLabel } from '@mui/joy';
import styled from 'styled-components';

import { Person, usePersonNoteQuery, usePersonQuery, useUpdatePersonNoteMutation } from '../../../generated';
import RichTextEditor from '../../RichTextEditor';
import { onBackground } from '../../../theme/colors';
import formatName from '../../../utils/formatName';

const Container = styled.div`
  padding: 16px;
  color: ${onBackground};
`;

const Form = styled.form`
  width: 640px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  label {
    color: ${onBackground};
  }

  > * {
    margin-bottom: 16px;
  }
`;

function EditPersonNote(): ReactElement {
  const params = useParams();
  const navigate = useNavigate();

  const { personId = '', personNoteId = '' } = params;

  const contentRef = useRef<string>('');
  const [contentLoading, setContentLoading] = useState<boolean>(true);

  const { data: personData, loading: personLoading } = usePersonQuery({
    variables: {
      input: {
        personId,
      },
    },
  });

  const { error, loading } = usePersonNoteQuery({
    onCompleted: (data) => {
      if (data?.personNote?.content) {
        contentRef.current = data.personNote.content;
      }

      setContentLoading(false);
    },
    variables: {
      input: {
        personNoteId,
      },
    },
  });

  const [updatePersonNote] = useUpdatePersonNoteMutation({
    onCompleted: (data) => {
      if (data.updatePersonNote.personNote?._id) {
        navigate(`/people/${personId}?selectedTab=1%3A1s`, {
          replace: true,
        });
      }
    },
  });

  const readyToSubmit = !!contentRef.current;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      console.log('contentref', contentRef.current);
      updatePersonNote({
        variables: {
          input: {
            content: contentRef.current,
            personNoteId,
          },
        },
      });
    }
  };

  const person = personData?.person;

  if (error || !person) return <div>{`Error: ${error}`}</div>;
  if (loading || personLoading || contentLoading) return <div />;

  console.log('re-render');

  return (
    <Container>
      <h1>{`Your 1:1 with ${formatName(person as Person)}`}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>{'Content'}</FormLabel>
          <RichTextEditor initialContent={contentRef.current} onChange={(html: string) => (contentRef.current = html)} />
        </FormControl>

        <Button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </Button>
      </Form>
    </Container>
  );
}

export default EditPersonNote;
