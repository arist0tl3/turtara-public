import { FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, FormLabel, Select, Option } from '@mui/joy';
import styled from 'styled-components';

import { useCreateFeedbackMutation } from '../../../generated';
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

type FeedbackType = 'praise' | 'constructive';

function NewFeedback(): ReactElement {
  const params = useParams();
  const navigate = useNavigate();

  const { personId = '' } = params;

  const [content, setContent] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType | ''>('');

  const [createFeedback] = useCreateFeedbackMutation({
    onCompleted: (data) => {
      if (data.createFeedback.feedback?._id) {
        navigate(-1);
      }
    },
    variables: {
      input: {
        content,
        personId,
        type: feedbackType,
      },
    },
  });

  const readyToSubmit = !!content && !!feedbackType;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      createFeedback();
    }
  };

  const handleFeedbackTypeChange = (value: FeedbackType) => {
    setFeedbackType(value);
  };

  return (
    <Container>
      <h1>{'New Feedback'}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>{'Feedback Type'}</FormLabel>
          <Select
            value={feedbackType}
            onChange={(e, value) => {
              if (e && !!value) {
                handleFeedbackTypeChange(value);
              }
            }}
          >
            <Option value={'praise'}>{'Praise'}</Option>
            <Option value={'constructive'}>{'Constructive'}</Option>
          </Select>
        </FormControl>

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

export default NewFeedback;
