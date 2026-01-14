import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { error, onBackground, onSurface, surface } from '../../../theme/colors';
import { useCreateCheckInMutation } from '../../../generated';
import { FormControl, FormLabel, Input, FormHelperText, RadioGroup, Radio, List, Checkbox, Button } from '@mui/joy';

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

interface NewCheckInFormProps {
  personId: string;
  onSuccess: () => void;
}

const meetingRequestReasons = [
  'Career goals & growth',
  'Feedback about your performance',
  'Updates about a task or project you are working on',
  'Help getting unblocked on a task or problem',
  'Feedback about the team or company',
  'Other',
];

const confidenceLevels = [
  { value: '5', label: 'Very Optimistic', color: '#4CAF50' },
  { value: '4', label: 'Generally Positive', color: '#AED581' },
  { value: '3', label: 'Neutral', color: '#FFF176' },
  { value: '2', label: 'Somewhat Uneasy', color: '#FFB74D' },
  { value: '1', label: 'Concerned', color: '#E57373' },
]

function NewCheckInForm({ onSuccess = () => {}, personId = '' }: NewCheckInFormProps): ReactElement {
  const [createCheckIn] = useCreateCheckInMutation();
  const [meetingReasons, setMeetingReasons] = useState<string[]>([]);
  const [weeklyConfidenceError, setWeeklyConfidenceError] = useState<string | null>(null);
  const [weeklyGoalError, setWeeklyGoalError] = useState<string | null>(null);
  const [meetingRequestedError, setMeetingRequestedError] = useState<string | null>(null);
  const [meetingRequestedReasonsError, setMeetingRequestedReasonsError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const weeklyConfidence = formData.get('weeklyConfidence');
    const weeklyConfidenceReason = formData.get('weeklyConfidenceReason') as string;
    const weeklyGoal = formData.get('weeklyGoal') as string;
    const meetingRequestedValue = formData.get('meetingRequested');

    if (!weeklyConfidence) {
      setWeeklyConfidenceError('Please select a confidence level');
      return;
    }

    if (!weeklyGoal) {
      setWeeklyGoalError('Please enter a weekly goal');
      return;
    }

    if (!meetingRequestedValue) {
      setMeetingRequestedError('Please select whether you would like to meet');
      return;
    }

    const meetingRequested = meetingRequestedValue === 'true';

    if (meetingRequested && meetingReasons.length === 0) {
      setMeetingRequestedError('Please select at least one reason for the meeting');
      return;
    }

    let meetingRequestedReasons = meetingReasons;

    if (meetingReasons.includes('Other')) {
      const otherReason = formData.get('meetingRequestedOtherReason');
      meetingRequestedReasons = meetingReasons.filter((reason) => reason !== 'Other');
      meetingRequestedReasons.push(otherReason as string);
    }

    await createCheckIn({
      refetchQueries: ['Person'],
      variables: {
        input: {
          personId,
          weeklyConfidence: parseInt(weeklyConfidence as string, 10),
          weeklyConfidenceReason,
          weeklyGoal,
          meetingRequested,
          meetingRequestedReasons,
        },
      },
    }).then((data) => {
      if (data.data?.createCheckIn) {
        onSuccess();
      } else {
        console.error('Failed to create check-in');
      }
    });

    form.reset();
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingRequestedReasonsError('');

    const { value } = event.target;
    if (meetingReasons.includes(value)) {
      setMeetingReasons(meetingReasons.filter((reason) => reason !== value));
    } else {
      setMeetingReasons([...meetingReasons, value]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <FormLabel>{'How are you feeling about the upcoming week?'}</FormLabel>
        <RadioGroup name={'weeklyConfidence'} onChange={() => setWeeklyConfidenceError('')}>
          {
            confidenceLevels.map(({ value, label, color }) => (
              <FormControl key={value} sx={{ p: 1, flexDirection: 'row', gap: 2 }}>
                <Radio value={value} />
                <FormLabel sx={{ color: `${color} !important`, margin: 0 }}>{label}</FormLabel>
              </FormControl>
            ))
          }
        </RadioGroup>
        {weeklyConfidenceError && <FormHelperText sx={{ color: `${error} !important` }}>{weeklyConfidenceError}</FormHelperText>}
      </div>

      <FormControl>
        <FormLabel>{'Any particular reason for feeling that way?'}</FormLabel>
        <Input name={'weeklyConfidenceReason'} />
      </FormControl>

      <FormControl>
        <FormLabel>{'What is your goal for this week?'}</FormLabel>
        <Input name={'weeklyGoal'} onChange={() => setWeeklyGoalError('')} />
        {weeklyGoalError && <FormHelperText sx={{ color: `${error} !important` }}>{weeklyGoalError}</FormHelperText>}
        {!weeklyGoalError && (
          <FormHelperText>{'It could be related to the sprint goal, a team objective, or a personal or career goal.'}</FormHelperText>
        )}
      </FormControl>

      <div>
        <FormLabel>{'Would you like to meet with me?'}</FormLabel>
        <RadioGroup name={'meetingRequested'} onChange={() => setMeetingRequestedError('')}>
          <FormControl sx={{ p: 1, flexDirection: 'row', gap: 2 }}>
            <Radio overlay value={'true'} />
            <FormLabel sx={{ color: `${onSurface} !important` }}>{'Yes, please'}</FormLabel>
          </FormControl>
          <FormControl sx={{ p: 1, flexDirection: 'row', gap: 2 }}>
            <Radio overlay value={'false'} />
            <FormLabel sx={{ color: `${onSurface} !important` }}>{'No thanks!'}</FormLabel>
          </FormControl>
        </RadioGroup>
        {meetingRequestedError && <FormHelperText sx={{ color: `${error} !important` }}>{meetingRequestedError}</FormHelperText>}
      </div>

      <div>
        <FormLabel>{'What topics would you like to cover in our meeting together?'}</FormLabel>
        <div role="group" aria-labelledby="sandwich-group">
          <List size="sm">
            {meetingRequestReasons.map((reason) => (
              <FormControl key={reason} sx={{ p: 1, flexDirection: 'row', gap: 2 }}>
                <Checkbox name={'meetingRequestedReasons'} value={reason} onChange={handleCheckBoxChange} />
                <FormLabel sx={{ margin: 0 }}>{reason}</FormLabel>
              </FormControl>
            ))}
          </List>
        </div>
        {meetingRequestedReasonsError && (
          <FormHelperText sx={{ color: `${error} !important` }}>{meetingRequestedReasonsError}</FormHelperText>
        )}
      </div>

      {meetingReasons.includes('Other') && (
        <FormControl>
          <FormLabel>{'Please specify what you would like to discuss'}</FormLabel>
          <Input name={'meetingRequestedOtherReason'} />
        </FormControl>
      )}

      <Button type={'submit'}>{'Submit'}</Button>
    </Form>
  );
}

export default NewCheckInForm;
