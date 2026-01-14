import type { Model } from 'mongoose';

import AuthToken, { IAuthToken } from './AuthToken/model';
import CheckIn, { ICheckIn } from './CheckIn/model';
import Feedback, { IFeedback } from './Feedback/model';
import MeetingPrep, { IMeetingPrep } from './MeetingPrep/model';
import Person, { IPerson } from './Person/model';
import PersonGoal, { IPersonGoal } from './PersonGoal/model';
import PersonNote, { IPersonNote } from './PersonNote/model';
import PassCodeToken, { IPassCodeToken } from './PassCodeToken/model';
import PullRequest, { IPullRequest } from './PullRequest/model';
import Role, { IRole } from './Role/model';
import Team, { ITeam } from './Team/model';
import TeamInsight, { ITeamInsight } from './TeamInsight/model';
import User, { IUser } from './User/model';
import UserTodo, { IUserTodo } from './UserTodo/model';

export type Models = {
  AuthToken: Model<IAuthToken, {}, {}, {}>;
  CheckIn: Model<ICheckIn, {}, {}, {}>;
  Feedback: Model<IFeedback, {}, {}, {}>;
  MeetingPrep: Model<IMeetingPrep, {}, {}, {}>;
  PassCodeToken: Model<IPassCodeToken, {}, {}, {}>;
  Person: Model<IPerson, {}, {}, {}>;
  PersonGoal: Model<IPersonGoal, {}, {}, {}>;
  PersonNote: Model<IPersonNote, {}, {}, {}>;
  PullRequest: Model<IPullRequest, {}, {}, {}>;
  Role: Model<IRole, {}, {}, {}>;
  Team: Model<ITeam, {}, {}, {}>;
  TeamInsight: Model<ITeamInsight, {}, {}, {}>;
  User: Model<IUser, {}, {}, {}>;
  UserTodo: Model<IUserTodo, {}, {}, {}>;
};

const models: Models = {
  AuthToken,
  CheckIn,
  Feedback,
  MeetingPrep,
  PassCodeToken,
  Person,
  PersonGoal,
  PersonNote,
  PullRequest,
  Role,
  Team,
  TeamInsight,
  User,
  UserTodo,
};

export default models;
