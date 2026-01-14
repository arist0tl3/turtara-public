import moment from 'moment';
import { CheckIn } from '../../../../generated';

export const prepareCheckInChartData = (checkIns: CheckIn[]) =>
  checkIns
    .map((checkIn) => ({
      date: moment(checkIn.createdAt).format('MMM D, YYYY'),
      score: checkIn.weeklyConfidence,
      goal: checkIn.weeklyGoal || null,
      reason: checkIn.weeklyConfidenceReason || null,
      meetingRequested: checkIn.meetingRequestedReasons.length > 0 ? checkIn.meetingRequestedReasons.join(', ') : null,
    }))
    .reverse();
