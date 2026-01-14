import { FormEvent, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, FormControl, FormLabel } from '@mui/joy';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { Moment } from 'moment';

import { useCreatePersonGoalMutation } from '../../../generated';

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
  const [targetDate, setTargetDate] = useState<Moment>(moment(new Date()));

  const [createPersonGoal] = useCreatePersonGoalMutation({
    onCompleted: (data) => {
      if (data.createPersonGoal.personGoal?._id) {
        navigate(-1);
      }
    },
    variables: {
      input: {
        content,
        personId,
        targetDate,
      },
    },
  });

  const readyToSubmit = !!content || !!targetDate;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (readyToSubmit) {
      createPersonGoal();
    }
  };

  const handleTargetDateChange = (date: Moment | null): void => {
    if (!!date) {
      setTargetDate(date);
    }
  };

  return (
    <div>
      <h1>{'New Person Goal'}</h1>
      <Form onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>{'Goal'}</FormLabel>
          <Input value={content} onChange={(e) => setContent(e.currentTarget.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>{'Target date'}</FormLabel>
          <DatePicker value={targetDate} label={'Choose a target date'} onChange={handleTargetDateChange} />
        </FormControl>

        <Button disabled={!readyToSubmit} type={'submit'}>
          {'Submit'}
        </Button>
      </Form>
    </div>
  );
}

export default NewPerson;
