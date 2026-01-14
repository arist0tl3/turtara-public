import { FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormLabel } from '@mui/joy';
import styled from 'styled-components';

import { useCreatePersonNoteMutation } from '../../../generated';
import RichTextEditor from '../../RichTextEditor';
import { background, onBackground, onPrimary, surface } from '../../../theme/colors';

const Container = styled.div`
  background: ${background};
  color: ${onBackground};
  padding: 16px;

  .tiptap.ProseMirror {
    color: ${surface} !important;
  }
`;

const Form = styled.form`
  width: 640px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 16px;
  }
`;

function NewPerson(): ReactElement {
  const params = useParams();
  const navigate = useNavigate();

  const { personId = '' } = params;

  const [content, setContent] = useState<string>('');

  const [createPersonNote] = useCreatePersonNoteMutation({
    onCompleted: (data) => {
      if (data.createPersonNote.personNote?._id) {
        navigate(-1);
      }
    },
    variables: {
      input: {
        content,
        personId,
      },
    },
  });

  const readyToSubmit = !!content;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      createPersonNote();
    }
  };

  return (
    <Container>
      <h1>{'New Person Note'}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>{'Content'}</FormLabel>
          <RichTextEditor initialContent={''} onChange={(html) => setContent(html)} />
        </FormControl>

        <Button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </Button>
      </Form>
    </Container>
  );
}

export default NewPerson;
