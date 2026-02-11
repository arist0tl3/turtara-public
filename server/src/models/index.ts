import type { Model } from 'mongoose';

import AuthToken, { IAuthToken } from './AuthToken/model';
import CheckIn, { ICheckIn } from './CheckIn/model';
import Feedback, { IFeedback } from './Feedback/model';
import Person, { IPerson } from './Person/model';
import PersonGoal, { IPersonGoal } from './PersonGoal/model';
import PersonNote, { IPersonNote } from './PersonNote/model';
import PassCodeToken, { IPassCodeToken } from './PassCodeToken/model';
import Role, { IRole } from './Role/model';
import Team, { ITeam } from './Team/model';
import User, { IUser } from './User/model';
import UserTodo, { IUserTodo } from './UserTodo/model';

export type Models = {
  AuthToken: Model<IAuthToken, {}, {}, {}>;
  CheckIn: Model<ICheckIn, {}, {}, {}>;
  Feedback: Model<IFeedback, {}, {}, {}>;
  PassCodeToken: Model<IPassCodeToken, {}, {}, {}>;
  Person: Model<IPerson, {}, {}, {}>;
  PersonGoal: Model<IPersonGoal, {}, {}, {}>;
  PersonNote: Model<IPersonNote, {}, {}, {}>;
  Role: Model<IRole, {}, {}, {}>;
  Team: Model<ITeam, {}, {}, {}>;
  User: Model<IUser, {}, {}, {}>;
  UserTodo: Model<IUserTodo, {}, {}, {}>;
};

const models: Models = {
  AuthToken,
  CheckIn,
  Feedback,
  PassCodeToken,
  Person,
  PersonGoal,
  PersonNote,
  Role,
  Team,
  User,
  UserTodo,
};

export default models;
