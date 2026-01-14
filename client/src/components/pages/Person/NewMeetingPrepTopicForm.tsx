import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { error, onBackground, surface } from '../../../theme/colors';
import { useAddMeetingPrepTopicMutation } from '../../../generated';
import { FormControl, FormLabel, Input, FormHelperText, Button } from '@mui/joy';

const Form = styled.form`
  width: 640px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  background: ${surface};

  > * {
    margin-bottom: 16px;
  }

  label {
    color: ${onBackground};
  }
`;

interface NewMeetingPrepTopicFormProps {
  personId: string;
  onSuccess: () => void;
}

function NewMeetingPrepTopicForm({ onSuccess = () => {}, personId = '' }: NewMeetingPrepTopicFormProps): ReactElement {
  const [createMeetingPrepTopic] = useAddMeetingPrepTopicMutation();
  const [topicError, setTopicError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const topic = formData.get('topic') as string;

    if (!topic) {
      setTopicError('Please enter a topic');
      return;
    }

    await createMeetingPrepTopic({
      refetchQueries: ['Person'],
      variables: {
        input: {
          personId,
          topic,
        },
      },
    }).then((data) => {
      if (data.data?.addMeetingPrepTopic) {
        onSuccess();
      } else {
        console.error('Failed to add meeting prep topic');
      }
    });

    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>{'What topic would you like to discuss?'}</FormLabel>
        <Input name={'topic'} onChange={() => setTopicError('')} />
        {topicError && <FormHelperText sx={{ color: `${error} !important` }}>{topicError}</FormHelperText>}
      </FormControl>

      <Button type={'submit'}>{'Submit'}</Button>
    </Form>
  );
}

export default NewMeetingPrepTopicForm;
