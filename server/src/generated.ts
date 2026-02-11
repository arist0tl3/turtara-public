import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CheckIn = {
  __typename?: 'CheckIn';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deleted?: Maybe<Scalars['Boolean']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  meetingRequested: Scalars['Boolean'];
  meetingRequestedReasons: Array<Scalars['String']>;
  personId: Scalars['String'];
  weeklyConfidence: Scalars['Int'];
  weeklyConfidenceReason?: Maybe<Scalars['String']>;
  weeklyGoal: Scalars['String'];
};

export type CheckInInput = {
  checkInId: Scalars['String'];
};

export type CompleteUserTodoInput = {
  todoId: Scalars['String'];
};

export type CompleteUserTodoResponse = {
  __typename?: 'CompleteUserTodoResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  todo?: Maybe<UserTodo>;
};

export type CreateCheckInInput = {
  meetingRequested: Scalars['Boolean'];
  meetingRequestedReasons: Array<Scalars['String']>;
  personId: Scalars['String'];
  weeklyConfidence: Scalars['Int'];
  weeklyConfidenceReason?: InputMaybe<Scalars['String']>;
  weeklyGoal: Scalars['String'];
};

export type CreateCheckInResponse = {
  __typename?: 'CreateCheckInResponse';
  checkIn?: Maybe<CheckIn>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateFeedbackInput = {
  content: Scalars['String'];
  personId: Scalars['String'];
  type: Scalars['String'];
};

export type CreateFeedbackResponse = {
  __typename?: 'CreateFeedbackResponse';
  error?: Maybe<Scalars['String']>;
  feedback?: Maybe<Feedback>;
  success: Scalars['Boolean'];
};

export type CreatePersonGoalInput = {
  content: Scalars['String'];
  personId: Scalars['String'];
  targetDate: Scalars['DateTime'];
};

export type CreatePersonGoalResponse = {
  __typename?: 'CreatePersonGoalResponse';
  error?: Maybe<Scalars['String']>;
  personGoal?: Maybe<PersonGoal>;
  success: Scalars['Boolean'];
};

export type CreatePersonInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  reportsToMe?: InputMaybe<Scalars['Boolean']>;
  roleId?: InputMaybe<Scalars['ID']>;
  teamId?: InputMaybe<Scalars['ID']>;
};

export type CreatePersonNoteInput = {
  content: Scalars['String'];
  personId: Scalars['String'];
};

export type CreatePersonNoteResponse = {
  __typename?: 'CreatePersonNoteResponse';
  error?: Maybe<Scalars['String']>;
  personNote?: Maybe<PersonNote>;
  success: Scalars['Boolean'];
};

export type CreatePersonResponse = {
  __typename?: 'CreatePersonResponse';
  error?: Maybe<Scalars['String']>;
  person?: Maybe<Person>;
  success: Scalars['Boolean'];
};

export type CreateRoleInput = {
  name: Scalars['String'];
};

export type CreateRoleResponse = {
  __typename?: 'CreateRoleResponse';
  error?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  success: Scalars['Boolean'];
};

export type CreateTeamInput = {
  name: Scalars['String'];
};

export type CreateTeamResponse = {
  __typename?: 'CreateTeamResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export type CreateUserTodoInput = {
  content: Scalars['String'];
};

export type CreateUserTodoResponse = {
  __typename?: 'CreateUserTodoResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  todo?: Maybe<UserTodo>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  _id: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Dashboard = {
  __typename?: 'Dashboard';
  outstandingMeetingReports: Array<OutstandingMeetingReport>;
};

export type DeleteCheckInInput = {
  checkInId: Scalars['String'];
};

export type DeleteCheckInResponse = {
  __typename?: 'DeleteCheckInResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteFeedbackInput = {
  feedbackId: Scalars['String'];
};

export type DeleteFeedbackResponse = {
  __typename?: 'DeleteFeedbackResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeletePersonGoalInput = {
  personGoalId: Scalars['String'];
};

export type DeletePersonGoalResponse = {
  __typename?: 'DeletePersonGoalResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeletePersonInput = {
  personId: Scalars['String'];
};

export type DeletePersonNoteInput = {
  personNoteId: Scalars['String'];
};

export type DeletePersonNoteResponse = {
  __typename?: 'DeletePersonNoteResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeletePersonResponse = {
  __typename?: 'DeletePersonResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteRoleInput = {
  roleId: Scalars['String'];
};

export type DeleteRoleResponse = {
  __typename?: 'DeleteRoleResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteTeamInput = {
  teamId: Scalars['String'];
};

export type DeleteTeamResponse = {
  __typename?: 'DeleteTeamResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Feedback = {
  __typename?: 'Feedback';
  _id: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  type: Scalars['String'];
};

export type FeedbackInput = {
  feedbackId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  completeUserTodo: CompleteUserTodoResponse;
  createCheckIn: CreateCheckInResponse;
  createFeedback: CreateFeedbackResponse;
  createPerson: CreatePersonResponse;
  createPersonGoal: CreatePersonGoalResponse;
  createPersonNote: CreatePersonNoteResponse;
  createRole: CreateRoleResponse;
  createTeam: CreateTeamResponse;
  createUserTodo: CreateUserTodoResponse;
  deleteCheckIn: DeleteCheckInResponse;
  deleteFeedback: DeleteFeedbackResponse;
  deletePerson: DeletePersonResponse;
  deletePersonGoal: DeletePersonGoalResponse;
  deletePersonNote: DeletePersonNoteResponse;
  deleteRole: DeleteRoleResponse;
  deleteTeam: DeleteTeamResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  register: RegisterResponse;
  uncompleteUserTodo: UncompleteUserTodoResponse;
  updateCurrentUser: UpdateCurrentUserResponse;
  updateFeedback: UpdateFeedbackResponse;
  updatePerson: UpdatePersonResponse;
  updatePersonGoal: UpdatePersonGoalResponse;
  updatePersonNote: UpdatePersonNoteResponse;
  updateRole: UpdateRoleResponse;
  updateTeam: UpdateTeamResponse;
};


export type MutationCompleteUserTodoArgs = {
  input: CompleteUserTodoInput;
};


export type MutationCreateCheckInArgs = {
  input: CreateCheckInInput;
};


export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationCreatePersonGoalArgs = {
  input: CreatePersonGoalInput;
};


export type MutationCreatePersonNoteArgs = {
  input: CreatePersonNoteInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateUserTodoArgs = {
  input: CreateUserTodoInput;
};


export type MutationDeleteCheckInArgs = {
  input: DeleteCheckInInput;
};


export type MutationDeleteFeedbackArgs = {
  input: DeleteFeedbackInput;
};


export type MutationDeletePersonArgs = {
  input: DeletePersonInput;
};


export type MutationDeletePersonGoalArgs = {
  input: DeletePersonGoalInput;
};


export type MutationDeletePersonNoteArgs = {
  input: DeletePersonNoteInput;
};


export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUncompleteUserTodoArgs = {
  input: UncompleteUserTodoInput;
};


export type MutationUpdateCurrentUserArgs = {
  input: UpdateCurrentUserInput;
};


export type MutationUpdateFeedbackArgs = {
  input: UpdateFeedbackInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
};


export type MutationUpdatePersonGoalArgs = {
  input: UpdatePersonGoalInput;
};


export type MutationUpdatePersonNoteArgs = {
  input: UpdatePersonNoteInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};

export type OutstandingMeetingReport = {
  __typename?: 'OutstandingMeetingReport';
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastMeetingDate?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  profileImageSrc?: Maybe<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  _id: Scalars['String'];
  checkIns?: Maybe<Array<CheckIn>>;
  feedback?: Maybe<Array<Feedback>>;
  firstName: Scalars['String'];
  kids?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  partners?: Maybe<Scalars['String']>;
  personGoals?: Maybe<Array<PersonGoal>>;
  personNotes?: Maybe<Array<PersonNote>>;
  pets?: Maybe<Scalars['String']>;
  profileImageSrc?: Maybe<Scalars['String']>;
  reportsToMe: Scalars['Boolean'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['String']>;
};

export type PersonGoal = {
  __typename?: 'PersonGoal';
  _id: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  targetDate: Scalars['DateTime'];
};

export type PersonGoalInput = {
  personGoalId: Scalars['String'];
};

export type PersonInput = {
  personId: Scalars['String'];
};

export type PersonNote = {
  __typename?: 'PersonNote';
  _id: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type PersonNoteInput = {
  personNoteId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  checkIn?: Maybe<CheckIn>;
  currentUser?: Maybe<CurrentUser>;
  dashboard?: Maybe<Dashboard>;
  feedback?: Maybe<Feedback>;
  peopleByCurrentUser?: Maybe<Array<Person>>;
  person?: Maybe<Person>;
  personGoal?: Maybe<PersonGoal>;
  personNote?: Maybe<PersonNote>;
  role?: Maybe<Role>;
  rolesByCurrentUser?: Maybe<Array<Role>>;
  team?: Maybe<Team>;
  teamsByCurrentUser?: Maybe<Array<Team>>;
  userTodosByCurrentUser: Array<UserTodo>;
};


export type QueryCheckInArgs = {
  input: CheckInInput;
};


export type QueryFeedbackArgs = {
  input: FeedbackInput;
};


export type QueryPersonArgs = {
  input: PersonInput;
};


export type QueryPersonGoalArgs = {
  input: PersonGoalInput;
};


export type QueryPersonNoteArgs = {
  input: PersonNoteInput;
};


export type QueryRoleArgs = {
  input: RoleInput;
};


export type QueryTeamArgs = {
  input: TeamInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
};

export type RoleInput = {
  roleId: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  people?: Maybe<Array<Person>>;
  profileImageSrc?: Maybe<Scalars['String']>;
};

export type TeamInput = {
  teamId: Scalars['String'];
};

export type UncompleteUserTodoInput = {
  todoId: Scalars['String'];
};

export type UncompleteUserTodoResponse = {
  __typename?: 'UncompleteUserTodoResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  todo?: Maybe<UserTodo>;
};

export type UpdateCurrentUserInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateCurrentUserResponse = {
  __typename?: 'UpdateCurrentUserResponse';
  currentUser?: Maybe<CurrentUser>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateFeedbackInput = {
  content: Scalars['String'];
  feedbackId: Scalars['String'];
  type: Scalars['String'];
};

export type UpdateFeedbackResponse = {
  __typename?: 'UpdateFeedbackResponse';
  error?: Maybe<Scalars['String']>;
  feedback?: Maybe<Feedback>;
  success: Scalars['Boolean'];
};

export type UpdatePersonGoalInput = {
  content: Scalars['String'];
  personGoalId: Scalars['String'];
  targetDate: Scalars['DateTime'];
};

export type UpdatePersonGoalResponse = {
  __typename?: 'UpdatePersonGoalResponse';
  error?: Maybe<Scalars['String']>;
  personGoal?: Maybe<PersonGoal>;
  success: Scalars['Boolean'];
};

export type UpdatePersonInput = {
  firstName?: InputMaybe<Scalars['String']>;
  kids?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  partners?: InputMaybe<Scalars['String']>;
  personId: Scalars['String'];
  pets?: InputMaybe<Scalars['String']>;
  profileImageSrc?: InputMaybe<Scalars['String']>;
  reportsToMe?: InputMaybe<Scalars['Boolean']>;
  roleId?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['String']>;
};

export type UpdatePersonNoteInput = {
  content: Scalars['String'];
  personNoteId: Scalars['String'];
};

export type UpdatePersonNoteResponse = {
  __typename?: 'UpdatePersonNoteResponse';
  error?: Maybe<Scalars['String']>;
  personNote?: Maybe<PersonNote>;
  success: Scalars['Boolean'];
};

export type UpdatePersonResponse = {
  __typename?: 'UpdatePersonResponse';
  error?: Maybe<Scalars['String']>;
  person?: Maybe<Person>;
  success: Scalars['Boolean'];
};

export type UpdateRoleInput = {
  name: Scalars['String'];
  roleId: Scalars['String'];
};

export type UpdateRoleResponse = {
  __typename?: 'UpdateRoleResponse';
  error?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  success: Scalars['Boolean'];
};

export type UpdateTeamInput = {
  name: Scalars['String'];
  profileImageSrc?: InputMaybe<Scalars['String']>;
  teamId: Scalars['String'];
};

export type UpdateTeamResponse = {
  __typename?: 'UpdateTeamResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export type UserTodo = {
  __typename?: 'UserTodo';
  _id: Scalars['String'];
  completedAt?: Maybe<Scalars['DateTime']>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type CompleteUserTodoMutationVariables = Exact<{
  input: CompleteUserTodoInput;
}>;


export type CompleteUserTodoMutation = { __typename?: 'Mutation', completeUserTodo: { __typename?: 'CompleteUserTodoResponse', success: boolean, error?: string | null, todo?: { __typename?: 'UserTodo', _id: string, completedAt?: any | null } | null } };

export type CreateCheckInMutationVariables = Exact<{
  input: CreateCheckInInput;
}>;


export type CreateCheckInMutation = { __typename?: 'Mutation', createCheckIn: { __typename?: 'CreateCheckInResponse', error?: string | null, success: boolean, checkIn?: { __typename?: 'CheckIn', _id: string, createdAt: any, weeklyConfidence: number, weeklyConfidenceReason?: string | null, weeklyGoal: string, meetingRequested: boolean, meetingRequestedReasons: Array<string>, personId: string } | null } };

export type CreateFeedbackMutationVariables = Exact<{
  input: CreateFeedbackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'CreateFeedbackResponse', error?: string | null, success: boolean, feedback?: { __typename?: 'Feedback', _id: string, content: string, type: string } | null } };

export type CreatePersonMutationVariables = Exact<{
  input: CreatePersonInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson: { __typename?: 'CreatePersonResponse', error?: string | null, success: boolean, person?: { __typename?: 'Person', _id: string, firstName: string, lastName: string } | null } };

export type CreatePersonGoalMutationVariables = Exact<{
  input: CreatePersonGoalInput;
}>;


export type CreatePersonGoalMutation = { __typename?: 'Mutation', createPersonGoal: { __typename?: 'CreatePersonGoalResponse', error?: string | null, success: boolean, personGoal?: { __typename?: 'PersonGoal', _id: string, content: string, targetDate: any } | null } };

export type CreatePersonNoteMutationVariables = Exact<{
  input: CreatePersonNoteInput;
}>;


export type CreatePersonNoteMutation = { __typename?: 'Mutation', createPersonNote: { __typename?: 'CreatePersonNoteResponse', error?: string | null, success: boolean, personNote?: { __typename?: 'PersonNote', _id: string, content: string } | null } };

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'CreateTeamResponse', error?: string | null, success: boolean, team?: { __typename?: 'Team', _id: string, name: string } | null } };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'CreateRoleResponse', error?: string | null, success: boolean, role?: { __typename?: 'Role', _id: string, name: string } | null } };

export type CreateUserTodoMutationVariables = Exact<{
  input: CreateUserTodoInput;
}>;


export type CreateUserTodoMutation = { __typename?: 'Mutation', createUserTodo: { __typename?: 'CreateUserTodoResponse', success: boolean, error?: string | null, todo?: { __typename?: 'UserTodo', _id: string, content: string, createdAt: any, completedAt?: any | null } | null } };

export type DeleteCheckInMutationVariables = Exact<{
  input: DeleteCheckInInput;
}>;


export type DeleteCheckInMutation = { __typename?: 'Mutation', deleteCheckIn: { __typename?: 'DeleteCheckInResponse', error?: string | null, success: boolean } };

export type DeleteFeedbackMutationVariables = Exact<{
  input: DeleteFeedbackInput;
}>;


export type DeleteFeedbackMutation = { __typename?: 'Mutation', deleteFeedback: { __typename?: 'DeleteFeedbackResponse', error?: string | null, success: boolean } };

export type DeletePersonMutationVariables = Exact<{
  input: DeletePersonInput;
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson: { __typename?: 'DeletePersonResponse', error?: string | null, success: boolean } };

export type DeletePersonGoalMutationVariables = Exact<{
  input: DeletePersonGoalInput;
}>;


export type DeletePersonGoalMutation = { __typename?: 'Mutation', deletePersonGoal: { __typename?: 'DeletePersonGoalResponse', error?: string | null, success: boolean } };

export type DeletePersonNoteMutationVariables = Exact<{
  input: DeletePersonNoteInput;
}>;


export type DeletePersonNoteMutation = { __typename?: 'Mutation', deletePersonNote: { __typename?: 'DeletePersonNoteResponse', error?: string | null, success: boolean } };

export type DeleteRoleMutationVariables = Exact<{
  input: DeleteRoleInput;
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole: { __typename?: 'DeleteRoleResponse', error?: string | null, success: boolean } };

export type DeleteTeamMutationVariables = Exact<{
  input: DeleteTeamInput;
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'DeleteTeamResponse', error?: string | null, success: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean, error?: string | null } };

export type UncompleteUserTodoMutationVariables = Exact<{
  input: UncompleteUserTodoInput;
}>;


export type UncompleteUserTodoMutation = { __typename?: 'Mutation', uncompleteUserTodo: { __typename?: 'UncompleteUserTodoResponse', success: boolean, error?: string | null, todo?: { __typename?: 'UserTodo', _id: string, completedAt?: any | null } | null } };

export type UpdateCurrentUserMutationVariables = Exact<{
  input: UpdateCurrentUserInput;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser: { __typename?: 'UpdateCurrentUserResponse', error?: string | null, success: boolean, currentUser?: { __typename?: 'CurrentUser', _id: string, email?: string | null, phoneNumber?: string | null } | null } };

export type UpdateFeedbackMutationVariables = Exact<{
  input: UpdateFeedbackInput;
}>;


export type UpdateFeedbackMutation = { __typename?: 'Mutation', updateFeedback: { __typename?: 'UpdateFeedbackResponse', error?: string | null, success: boolean, feedback?: { __typename?: 'Feedback', _id: string, content: string, type: string } | null } };

export type UpdatePersonMutationVariables = Exact<{
  input: UpdatePersonInput;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson: { __typename?: 'UpdatePersonResponse', error?: string | null, success: boolean, person?: { __typename?: 'Person', _id: string, firstName: string, lastName: string, kids?: string | null, pets?: string | null, partners?: string | null, profileImageSrc?: string | null, reportsToMe: boolean, role?: { __typename?: 'Role', _id: string, name: string } | null, team?: { __typename?: 'Team', _id: string, name: string } | null } | null } };

export type UpdatePersonGoalMutationVariables = Exact<{
  input: UpdatePersonGoalInput;
}>;


export type UpdatePersonGoalMutation = { __typename?: 'Mutation', updatePersonGoal: { __typename?: 'UpdatePersonGoalResponse', error?: string | null, success: boolean, personGoal?: { __typename?: 'PersonGoal', _id: string, content: string, targetDate: any } | null } };

export type UpdatePersonNoteMutationVariables = Exact<{
  input: UpdatePersonNoteInput;
}>;


export type UpdatePersonNoteMutation = { __typename?: 'Mutation', updatePersonNote: { __typename?: 'UpdatePersonNoteResponse', error?: string | null, success: boolean, personNote?: { __typename?: 'PersonNote', _id: string, content: string } | null } };

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'UpdateRoleResponse', error?: string | null, success: boolean, role?: { __typename?: 'Role', _id: string, name: string } | null } };

export type UpdateTeamMutationVariables = Exact<{
  input: UpdateTeamInput;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam: { __typename?: 'UpdateTeamResponse', error?: string | null, success: boolean, team?: { __typename?: 'Team', _id: string, name: string } | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'CurrentUser', _id: string, email?: string | null, phoneNumber?: string | null } | null };

export type DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', dashboard?: { __typename?: 'Dashboard', outstandingMeetingReports: Array<{ __typename?: 'OutstandingMeetingReport', _id: string, firstName: string, lastName: string, profileImageSrc?: string | null, lastMeetingDate?: any | null }> } | null };

export type FeedbackQueryVariables = Exact<{
  input: FeedbackInput;
}>;


export type FeedbackQuery = { __typename?: 'Query', feedback?: { __typename?: 'Feedback', _id: string, content: string, createdAt: any, type: string } | null };

export type PeopleByCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type PeopleByCurrentUserQuery = { __typename?: 'Query', peopleByCurrentUser?: Array<{ __typename?: 'Person', _id: string, firstName: string, lastName: string, profileImageSrc?: string | null, reportsToMe: boolean, role?: { __typename?: 'Role', _id: string, name: string } | null, team?: { __typename?: 'Team', _id: string, name: string } | null }> | null };

export type PersonQueryVariables = Exact<{
  input: PersonInput;
}>;


export type PersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', _id: string, firstName: string, kids?: string | null, lastName: string, partners?: string | null, pets?: string | null, profileImageSrc?: string | null, reportsToMe: boolean, checkIns?: Array<{ __typename?: 'CheckIn', _id: string, createdAt: any, weeklyConfidence: number, weeklyConfidenceReason?: string | null, weeklyGoal: string, meetingRequested: boolean, meetingRequestedReasons: Array<string> }> | null, feedback?: Array<{ __typename?: 'Feedback', _id: string, content: string, createdAt: any, type: string }> | null, personGoals?: Array<{ __typename?: 'PersonGoal', _id: string, content: string, createdAt: any, targetDate: any }> | null, personNotes?: Array<{ __typename?: 'PersonNote', _id: string, content: string, createdAt: any }> | null, role?: { __typename?: 'Role', _id: string, name: string } | null, team?: { __typename?: 'Team', _id: string, name: string } | null } | null };

export type PersonGoalQueryVariables = Exact<{
  input: PersonGoalInput;
}>;


export type PersonGoalQuery = { __typename?: 'Query', personGoal?: { __typename?: 'PersonGoal', _id: string, content: string, createdAt: any, targetDate: any } | null };

export type PersonNoteQueryVariables = Exact<{
  input: PersonNoteInput;
}>;


export type PersonNoteQuery = { __typename?: 'Query', personNote?: { __typename?: 'PersonNote', _id: string, content: string, createdAt: any } | null };

export type RolesByCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesByCurrentUserQuery = { __typename?: 'Query', rolesByCurrentUser?: Array<{ __typename?: 'Role', _id: string, name: string }> | null };

export type TeamQueryVariables = Exact<{
  input: TeamInput;
}>;


export type TeamQuery = { __typename?: 'Query', team?: { __typename?: 'Team', _id: string, createdAt: any, name: string, profileImageSrc?: string | null, people?: Array<{ __typename?: 'Person', _id: string, firstName: string, lastName: string, profileImageSrc?: string | null, reportsToMe: boolean }> | null } | null };

export type TeamsByCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsByCurrentUserQuery = { __typename?: 'Query', teamsByCurrentUser?: Array<{ __typename?: 'Team', _id: string, name: string, profileImageSrc?: string | null }> | null };

export type UserTodosByCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTodosByCurrentUserQuery = { __typename?: 'Query', userTodosByCurrentUser: Array<{ __typename?: 'UserTodo', _id: string, content: string, createdAt: any, completedAt?: any | null }> };


export const CompleteUserTodoDocument = gql`
    mutation CompleteUserTodo($input: CompleteUserTodoInput!) {
  completeUserTodo(input: $input) {
    success
    error
    todo {
      _id
      completedAt
    }
  }
}
    `;
export type CompleteUserTodoMutationFn = Apollo.MutationFunction<CompleteUserTodoMutation, CompleteUserTodoMutationVariables>;

/**
 * __useCompleteUserTodoMutation__
 *
 * To run a mutation, you first call `useCompleteUserTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteUserTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeUserTodoMutation, { data, loading, error }] = useCompleteUserTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteUserTodoMutation(baseOptions?: Apollo.MutationHookOptions<CompleteUserTodoMutation, CompleteUserTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteUserTodoMutation, CompleteUserTodoMutationVariables>(CompleteUserTodoDocument, options);
      }
export type CompleteUserTodoMutationHookResult = ReturnType<typeof useCompleteUserTodoMutation>;
export type CompleteUserTodoMutationResult = Apollo.MutationResult<CompleteUserTodoMutation>;
export type CompleteUserTodoMutationOptions = Apollo.BaseMutationOptions<CompleteUserTodoMutation, CompleteUserTodoMutationVariables>;
export const CreateCheckInDocument = gql`
    mutation CreateCheckIn($input: CreateCheckInInput!) {
  createCheckIn(input: $input) {
    error
    checkIn {
      _id
      createdAt
      weeklyConfidence
      weeklyConfidenceReason
      weeklyGoal
      meetingRequested
      meetingRequestedReasons
      personId
    }
    success
  }
}
    `;
export type CreateCheckInMutationFn = Apollo.MutationFunction<CreateCheckInMutation, CreateCheckInMutationVariables>;

/**
 * __useCreateCheckInMutation__
 *
 * To run a mutation, you first call `useCreateCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckInMutation, { data, loading, error }] = useCreateCheckInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCheckInMutation(baseOptions?: Apollo.MutationHookOptions<CreateCheckInMutation, CreateCheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCheckInMutation, CreateCheckInMutationVariables>(CreateCheckInDocument, options);
      }
export type CreateCheckInMutationHookResult = ReturnType<typeof useCreateCheckInMutation>;
export type CreateCheckInMutationResult = Apollo.MutationResult<CreateCheckInMutation>;
export type CreateCheckInMutationOptions = Apollo.BaseMutationOptions<CreateCheckInMutation, CreateCheckInMutationVariables>;
export const CreateFeedbackDocument = gql`
    mutation CreateFeedback($input: CreateFeedbackInput!) {
  createFeedback(input: $input) {
    error
    feedback {
      _id
      content
      type
    }
    success
  }
}
    `;
export type CreateFeedbackMutationFn = Apollo.MutationFunction<CreateFeedbackMutation, CreateFeedbackMutationVariables>;

/**
 * __useCreateFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedbackMutation, { data, loading, error }] = useCreateFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument, options);
      }
export type CreateFeedbackMutationHookResult = ReturnType<typeof useCreateFeedbackMutation>;
export type CreateFeedbackMutationResult = Apollo.MutationResult<CreateFeedbackMutation>;
export type CreateFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>;
export const CreatePersonDocument = gql`
    mutation CreatePerson($input: CreatePersonInput!) {
  createPerson(input: $input) {
    error
    person {
      _id
      firstName
      lastName
    }
    success
  }
}
    `;
export type CreatePersonMutationFn = Apollo.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, options);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = Apollo.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = Apollo.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const CreatePersonGoalDocument = gql`
    mutation CreatePersonGoal($input: CreatePersonGoalInput!) {
  createPersonGoal(input: $input) {
    error
    personGoal {
      _id
      content
      targetDate
    }
    success
  }
}
    `;
export type CreatePersonGoalMutationFn = Apollo.MutationFunction<CreatePersonGoalMutation, CreatePersonGoalMutationVariables>;

/**
 * __useCreatePersonGoalMutation__
 *
 * To run a mutation, you first call `useCreatePersonGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonGoalMutation, { data, loading, error }] = useCreatePersonGoalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePersonGoalMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonGoalMutation, CreatePersonGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonGoalMutation, CreatePersonGoalMutationVariables>(CreatePersonGoalDocument, options);
      }
export type CreatePersonGoalMutationHookResult = ReturnType<typeof useCreatePersonGoalMutation>;
export type CreatePersonGoalMutationResult = Apollo.MutationResult<CreatePersonGoalMutation>;
export type CreatePersonGoalMutationOptions = Apollo.BaseMutationOptions<CreatePersonGoalMutation, CreatePersonGoalMutationVariables>;
export const CreatePersonNoteDocument = gql`
    mutation CreatePersonNote($input: CreatePersonNoteInput!) {
  createPersonNote(input: $input) {
    error
    personNote {
      _id
      content
    }
    success
  }
}
    `;
export type CreatePersonNoteMutationFn = Apollo.MutationFunction<CreatePersonNoteMutation, CreatePersonNoteMutationVariables>;

/**
 * __useCreatePersonNoteMutation__
 *
 * To run a mutation, you first call `useCreatePersonNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonNoteMutation, { data, loading, error }] = useCreatePersonNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePersonNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonNoteMutation, CreatePersonNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonNoteMutation, CreatePersonNoteMutationVariables>(CreatePersonNoteDocument, options);
      }
export type CreatePersonNoteMutationHookResult = ReturnType<typeof useCreatePersonNoteMutation>;
export type CreatePersonNoteMutationResult = Apollo.MutationResult<CreatePersonNoteMutation>;
export type CreatePersonNoteMutationOptions = Apollo.BaseMutationOptions<CreatePersonNoteMutation, CreatePersonNoteMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($input: CreateTeamInput!) {
  createTeam(input: $input) {
    error
    team {
      _id
      name
    }
    success
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    error
    role {
      _id
      name
    }
    success
  }
}
    `;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const CreateUserTodoDocument = gql`
    mutation CreateUserTodo($input: CreateUserTodoInput!) {
  createUserTodo(input: $input) {
    success
    error
    todo {
      _id
      content
      createdAt
      completedAt
    }
  }
}
    `;
export type CreateUserTodoMutationFn = Apollo.MutationFunction<CreateUserTodoMutation, CreateUserTodoMutationVariables>;

/**
 * __useCreateUserTodoMutation__
 *
 * To run a mutation, you first call `useCreateUserTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserTodoMutation, { data, loading, error }] = useCreateUserTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserTodoMutation, CreateUserTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserTodoMutation, CreateUserTodoMutationVariables>(CreateUserTodoDocument, options);
      }
export type CreateUserTodoMutationHookResult = ReturnType<typeof useCreateUserTodoMutation>;
export type CreateUserTodoMutationResult = Apollo.MutationResult<CreateUserTodoMutation>;
export type CreateUserTodoMutationOptions = Apollo.BaseMutationOptions<CreateUserTodoMutation, CreateUserTodoMutationVariables>;
export const DeleteCheckInDocument = gql`
    mutation DeleteCheckIn($input: DeleteCheckInInput!) {
  deleteCheckIn(input: $input) {
    error
    success
  }
}
    `;
export type DeleteCheckInMutationFn = Apollo.MutationFunction<DeleteCheckInMutation, DeleteCheckInMutationVariables>;

/**
 * __useDeleteCheckInMutation__
 *
 * To run a mutation, you first call `useDeleteCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCheckInMutation, { data, loading, error }] = useDeleteCheckInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCheckInMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCheckInMutation, DeleteCheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCheckInMutation, DeleteCheckInMutationVariables>(DeleteCheckInDocument, options);
      }
export type DeleteCheckInMutationHookResult = ReturnType<typeof useDeleteCheckInMutation>;
export type DeleteCheckInMutationResult = Apollo.MutationResult<DeleteCheckInMutation>;
export type DeleteCheckInMutationOptions = Apollo.BaseMutationOptions<DeleteCheckInMutation, DeleteCheckInMutationVariables>;
export const DeleteFeedbackDocument = gql`
    mutation DeleteFeedback($input: DeleteFeedbackInput!) {
  deleteFeedback(input: $input) {
    error
    success
  }
}
    `;
export type DeleteFeedbackMutationFn = Apollo.MutationFunction<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>;

/**
 * __useDeleteFeedbackMutation__
 *
 * To run a mutation, you first call `useDeleteFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFeedbackMutation, { data, loading, error }] = useDeleteFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>(DeleteFeedbackDocument, options);
      }
export type DeleteFeedbackMutationHookResult = ReturnType<typeof useDeleteFeedbackMutation>;
export type DeleteFeedbackMutationResult = Apollo.MutationResult<DeleteFeedbackMutation>;
export type DeleteFeedbackMutationOptions = Apollo.BaseMutationOptions<DeleteFeedbackMutation, DeleteFeedbackMutationVariables>;
export const DeletePersonDocument = gql`
    mutation DeletePerson($input: DeletePersonInput!) {
  deletePerson(input: $input) {
    error
    success
  }
}
    `;
export type DeletePersonMutationFn = Apollo.MutationFunction<DeletePersonMutation, DeletePersonMutationVariables>;

/**
 * __useDeletePersonMutation__
 *
 * To run a mutation, you first call `useDeletePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonMutation, { data, loading, error }] = useDeletePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePersonMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonMutation, DeletePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonMutation, DeletePersonMutationVariables>(DeletePersonDocument, options);
      }
export type DeletePersonMutationHookResult = ReturnType<typeof useDeletePersonMutation>;
export type DeletePersonMutationResult = Apollo.MutationResult<DeletePersonMutation>;
export type DeletePersonMutationOptions = Apollo.BaseMutationOptions<DeletePersonMutation, DeletePersonMutationVariables>;
export const DeletePersonGoalDocument = gql`
    mutation DeletePersonGoal($input: DeletePersonGoalInput!) {
  deletePersonGoal(input: $input) {
    error
    success
  }
}
    `;
export type DeletePersonGoalMutationFn = Apollo.MutationFunction<DeletePersonGoalMutation, DeletePersonGoalMutationVariables>;

/**
 * __useDeletePersonGoalMutation__
 *
 * To run a mutation, you first call `useDeletePersonGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonGoalMutation, { data, loading, error }] = useDeletePersonGoalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePersonGoalMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonGoalMutation, DeletePersonGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonGoalMutation, DeletePersonGoalMutationVariables>(DeletePersonGoalDocument, options);
      }
export type DeletePersonGoalMutationHookResult = ReturnType<typeof useDeletePersonGoalMutation>;
export type DeletePersonGoalMutationResult = Apollo.MutationResult<DeletePersonGoalMutation>;
export type DeletePersonGoalMutationOptions = Apollo.BaseMutationOptions<DeletePersonGoalMutation, DeletePersonGoalMutationVariables>;
export const DeletePersonNoteDocument = gql`
    mutation DeletePersonNote($input: DeletePersonNoteInput!) {
  deletePersonNote(input: $input) {
    error
    success
  }
}
    `;
export type DeletePersonNoteMutationFn = Apollo.MutationFunction<DeletePersonNoteMutation, DeletePersonNoteMutationVariables>;

/**
 * __useDeletePersonNoteMutation__
 *
 * To run a mutation, you first call `useDeletePersonNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonNoteMutation, { data, loading, error }] = useDeletePersonNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePersonNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonNoteMutation, DeletePersonNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonNoteMutation, DeletePersonNoteMutationVariables>(DeletePersonNoteDocument, options);
      }
export type DeletePersonNoteMutationHookResult = ReturnType<typeof useDeletePersonNoteMutation>;
export type DeletePersonNoteMutationResult = Apollo.MutationResult<DeletePersonNoteMutation>;
export type DeletePersonNoteMutationOptions = Apollo.BaseMutationOptions<DeletePersonNoteMutation, DeletePersonNoteMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation DeleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input) {
    error
    success
  }
}
    `;
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
      }
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($input: DeleteTeamInput!) {
  deleteTeam(input: $input) {
    error
    success
  }
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    error
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UncompleteUserTodoDocument = gql`
    mutation UncompleteUserTodo($input: UncompleteUserTodoInput!) {
  uncompleteUserTodo(input: $input) {
    success
    error
    todo {
      _id
      completedAt
    }
  }
}
    `;
export type UncompleteUserTodoMutationFn = Apollo.MutationFunction<UncompleteUserTodoMutation, UncompleteUserTodoMutationVariables>;

/**
 * __useUncompleteUserTodoMutation__
 *
 * To run a mutation, you first call `useUncompleteUserTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUncompleteUserTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uncompleteUserTodoMutation, { data, loading, error }] = useUncompleteUserTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUncompleteUserTodoMutation(baseOptions?: Apollo.MutationHookOptions<UncompleteUserTodoMutation, UncompleteUserTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UncompleteUserTodoMutation, UncompleteUserTodoMutationVariables>(UncompleteUserTodoDocument, options);
      }
export type UncompleteUserTodoMutationHookResult = ReturnType<typeof useUncompleteUserTodoMutation>;
export type UncompleteUserTodoMutationResult = Apollo.MutationResult<UncompleteUserTodoMutation>;
export type UncompleteUserTodoMutationOptions = Apollo.BaseMutationOptions<UncompleteUserTodoMutation, UncompleteUserTodoMutationVariables>;
export const UpdateCurrentUserDocument = gql`
    mutation UpdateCurrentUser($input: UpdateCurrentUserInput!) {
  updateCurrentUser(input: $input) {
    error
    success
    currentUser {
      _id
      email
      phoneNumber
    }
  }
}
    `;
export type UpdateCurrentUserMutationFn = Apollo.MutationFunction<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;

/**
 * __useUpdateCurrentUserMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrentUserMutation, { data, loading, error }] = useUpdateCurrentUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>(UpdateCurrentUserDocument, options);
      }
export type UpdateCurrentUserMutationHookResult = ReturnType<typeof useUpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationResult = Apollo.MutationResult<UpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationOptions = Apollo.BaseMutationOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;
export const UpdateFeedbackDocument = gql`
    mutation UpdateFeedback($input: UpdateFeedbackInput!) {
  updateFeedback(input: $input) {
    error
    feedback {
      _id
      content
      type
    }
    success
  }
}
    `;
export type UpdateFeedbackMutationFn = Apollo.MutationFunction<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>;

/**
 * __useUpdateFeedbackMutation__
 *
 * To run a mutation, you first call `useUpdateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeedbackMutation, { data, loading, error }] = useUpdateFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>(UpdateFeedbackDocument, options);
      }
export type UpdateFeedbackMutationHookResult = ReturnType<typeof useUpdateFeedbackMutation>;
export type UpdateFeedbackMutationResult = Apollo.MutationResult<UpdateFeedbackMutation>;
export type UpdateFeedbackMutationOptions = Apollo.BaseMutationOptions<UpdateFeedbackMutation, UpdateFeedbackMutationVariables>;
export const UpdatePersonDocument = gql`
    mutation UpdatePerson($input: UpdatePersonInput!) {
  updatePerson(input: $input) {
    error
    person {
      _id
      firstName
      lastName
      kids
      pets
      partners
      profileImageSrc
      reportsToMe
      role {
        _id
        name
      }
      team {
        _id
        name
      }
    }
    success
  }
}
    `;
export type UpdatePersonMutationFn = Apollo.MutationFunction<UpdatePersonMutation, UpdatePersonMutationVariables>;

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonMutation, UpdatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonMutation, UpdatePersonMutationVariables>(UpdatePersonDocument, options);
      }
export type UpdatePersonMutationHookResult = ReturnType<typeof useUpdatePersonMutation>;
export type UpdatePersonMutationResult = Apollo.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = Apollo.BaseMutationOptions<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const UpdatePersonGoalDocument = gql`
    mutation UpdatePersonGoal($input: UpdatePersonGoalInput!) {
  updatePersonGoal(input: $input) {
    error
    personGoal {
      _id
      content
      targetDate
    }
    success
  }
}
    `;
export type UpdatePersonGoalMutationFn = Apollo.MutationFunction<UpdatePersonGoalMutation, UpdatePersonGoalMutationVariables>;

/**
 * __useUpdatePersonGoalMutation__
 *
 * To run a mutation, you first call `useUpdatePersonGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonGoalMutation, { data, loading, error }] = useUpdatePersonGoalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonGoalMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonGoalMutation, UpdatePersonGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonGoalMutation, UpdatePersonGoalMutationVariables>(UpdatePersonGoalDocument, options);
      }
export type UpdatePersonGoalMutationHookResult = ReturnType<typeof useUpdatePersonGoalMutation>;
export type UpdatePersonGoalMutationResult = Apollo.MutationResult<UpdatePersonGoalMutation>;
export type UpdatePersonGoalMutationOptions = Apollo.BaseMutationOptions<UpdatePersonGoalMutation, UpdatePersonGoalMutationVariables>;
export const UpdatePersonNoteDocument = gql`
    mutation UpdatePersonNote($input: UpdatePersonNoteInput!) {
  updatePersonNote(input: $input) {
    error
    personNote {
      _id
      content
    }
    success
  }
}
    `;
export type UpdatePersonNoteMutationFn = Apollo.MutationFunction<UpdatePersonNoteMutation, UpdatePersonNoteMutationVariables>;

/**
 * __useUpdatePersonNoteMutation__
 *
 * To run a mutation, you first call `useUpdatePersonNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonNoteMutation, { data, loading, error }] = useUpdatePersonNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonNoteMutation, UpdatePersonNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonNoteMutation, UpdatePersonNoteMutationVariables>(UpdatePersonNoteDocument, options);
      }
export type UpdatePersonNoteMutationHookResult = ReturnType<typeof useUpdatePersonNoteMutation>;
export type UpdatePersonNoteMutationResult = Apollo.MutationResult<UpdatePersonNoteMutation>;
export type UpdatePersonNoteMutationOptions = Apollo.BaseMutationOptions<UpdatePersonNoteMutation, UpdatePersonNoteMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    error
    role {
      _id
      name
    }
    success
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($input: UpdateTeamInput!) {
  updateTeam(input: $input) {
    error
    team {
      _id
      name
    }
    success
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    _id
    email
    phoneNumber
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const DashboardDocument = gql`
    query Dashboard {
  dashboard {
    outstandingMeetingReports {
      _id
      firstName
      lastName
      profileImageSrc
      lastMeetingDate
    }
  }
}
    `;

/**
 * __useDashboardQuery__
 *
 * To run a query within a React component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardQuery(baseOptions?: Apollo.QueryHookOptions<DashboardQuery, DashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardQuery, DashboardQueryVariables>(DashboardDocument, options);
      }
export function useDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardQuery, DashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardQuery, DashboardQueryVariables>(DashboardDocument, options);
        }
export type DashboardQueryHookResult = ReturnType<typeof useDashboardQuery>;
export type DashboardLazyQueryHookResult = ReturnType<typeof useDashboardLazyQuery>;
export type DashboardQueryResult = Apollo.QueryResult<DashboardQuery, DashboardQueryVariables>;
export const FeedbackDocument = gql`
    query Feedback($input: FeedbackInput!) {
  feedback(input: $input) {
    _id
    content
    createdAt
    type
  }
}
    `;

/**
 * __useFeedbackQuery__
 *
 * To run a query within a React component, call `useFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedbackQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFeedbackQuery(baseOptions: Apollo.QueryHookOptions<FeedbackQuery, FeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedbackQuery, FeedbackQueryVariables>(FeedbackDocument, options);
      }
export function useFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedbackQuery, FeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedbackQuery, FeedbackQueryVariables>(FeedbackDocument, options);
        }
export type FeedbackQueryHookResult = ReturnType<typeof useFeedbackQuery>;
export type FeedbackLazyQueryHookResult = ReturnType<typeof useFeedbackLazyQuery>;
export type FeedbackQueryResult = Apollo.QueryResult<FeedbackQuery, FeedbackQueryVariables>;
export const PeopleByCurrentUserDocument = gql`
    query PeopleByCurrentUser {
  peopleByCurrentUser {
    _id
    firstName
    lastName
    profileImageSrc
    reportsToMe
    role {
      _id
      name
    }
    team {
      _id
      name
    }
  }
}
    `;

/**
 * __usePeopleByCurrentUserQuery__
 *
 * To run a query within a React component, call `usePeopleByCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeopleByCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeopleByCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function usePeopleByCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<PeopleByCurrentUserQuery, PeopleByCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeopleByCurrentUserQuery, PeopleByCurrentUserQueryVariables>(PeopleByCurrentUserDocument, options);
      }
export function usePeopleByCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeopleByCurrentUserQuery, PeopleByCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeopleByCurrentUserQuery, PeopleByCurrentUserQueryVariables>(PeopleByCurrentUserDocument, options);
        }
export type PeopleByCurrentUserQueryHookResult = ReturnType<typeof usePeopleByCurrentUserQuery>;
export type PeopleByCurrentUserLazyQueryHookResult = ReturnType<typeof usePeopleByCurrentUserLazyQuery>;
export type PeopleByCurrentUserQueryResult = Apollo.QueryResult<PeopleByCurrentUserQuery, PeopleByCurrentUserQueryVariables>;
export const PersonDocument = gql`
    query Person($input: PersonInput!) {
  person(input: $input) {
    _id
    firstName
    checkIns {
      _id
      createdAt
      weeklyConfidence
      weeklyConfidenceReason
      weeklyGoal
      meetingRequested
      meetingRequestedReasons
    }
    feedback {
      _id
      content
      createdAt
      type
    }
    kids
    lastName
    partners
    pets
    profileImageSrc
    personGoals {
      _id
      content
      createdAt
      targetDate
    }
    personNotes {
      _id
      content
      createdAt
    }
    reportsToMe
    role {
      _id
      name
    }
    team {
      _id
      name
    }
  }
}
    `;

/**
 * __usePersonQuery__
 *
 * To run a query within a React component, call `usePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePersonQuery(baseOptions: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
      }
export function usePersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
export type PersonQueryResult = Apollo.QueryResult<PersonQuery, PersonQueryVariables>;
export const PersonGoalDocument = gql`
    query PersonGoal($input: PersonGoalInput!) {
  personGoal(input: $input) {
    _id
    content
    createdAt
    targetDate
  }
}
    `;

/**
 * __usePersonGoalQuery__
 *
 * To run a query within a React component, call `usePersonGoalQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonGoalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonGoalQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePersonGoalQuery(baseOptions: Apollo.QueryHookOptions<PersonGoalQuery, PersonGoalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonGoalQuery, PersonGoalQueryVariables>(PersonGoalDocument, options);
      }
export function usePersonGoalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonGoalQuery, PersonGoalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonGoalQuery, PersonGoalQueryVariables>(PersonGoalDocument, options);
        }
export type PersonGoalQueryHookResult = ReturnType<typeof usePersonGoalQuery>;
export type PersonGoalLazyQueryHookResult = ReturnType<typeof usePersonGoalLazyQuery>;
export type PersonGoalQueryResult = Apollo.QueryResult<PersonGoalQuery, PersonGoalQueryVariables>;
export const PersonNoteDocument = gql`
    query PersonNote($input: PersonNoteInput!) {
  personNote(input: $input) {
    _id
    content
    createdAt
  }
}
    `;

/**
 * __usePersonNoteQuery__
 *
 * To run a query within a React component, call `usePersonNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonNoteQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePersonNoteQuery(baseOptions: Apollo.QueryHookOptions<PersonNoteQuery, PersonNoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonNoteQuery, PersonNoteQueryVariables>(PersonNoteDocument, options);
      }
export function usePersonNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonNoteQuery, PersonNoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonNoteQuery, PersonNoteQueryVariables>(PersonNoteDocument, options);
        }
export type PersonNoteQueryHookResult = ReturnType<typeof usePersonNoteQuery>;
export type PersonNoteLazyQueryHookResult = ReturnType<typeof usePersonNoteLazyQuery>;
export type PersonNoteQueryResult = Apollo.QueryResult<PersonNoteQuery, PersonNoteQueryVariables>;
export const RolesByCurrentUserDocument = gql`
    query RolesByCurrentUser {
  rolesByCurrentUser {
    _id
    name
  }
}
    `;

/**
 * __useRolesByCurrentUserQuery__
 *
 * To run a query within a React component, call `useRolesByCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesByCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesByCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesByCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<RolesByCurrentUserQuery, RolesByCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesByCurrentUserQuery, RolesByCurrentUserQueryVariables>(RolesByCurrentUserDocument, options);
      }
export function useRolesByCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesByCurrentUserQuery, RolesByCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesByCurrentUserQuery, RolesByCurrentUserQueryVariables>(RolesByCurrentUserDocument, options);
        }
export type RolesByCurrentUserQueryHookResult = ReturnType<typeof useRolesByCurrentUserQuery>;
export type RolesByCurrentUserLazyQueryHookResult = ReturnType<typeof useRolesByCurrentUserLazyQuery>;
export type RolesByCurrentUserQueryResult = Apollo.QueryResult<RolesByCurrentUserQuery, RolesByCurrentUserQueryVariables>;
export const TeamDocument = gql`
    query Team($input: TeamInput!) {
  team(input: $input) {
    _id
    createdAt
    name
    people {
      _id
      firstName
      lastName
      profileImageSrc
      reportsToMe
    }
    profileImageSrc
  }
}
    `;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, options);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const TeamsByCurrentUserDocument = gql`
    query TeamsByCurrentUser {
  teamsByCurrentUser {
    _id
    name
    profileImageSrc
  }
}
    `;

/**
 * __useTeamsByCurrentUserQuery__
 *
 * To run a query within a React component, call `useTeamsByCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsByCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsByCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsByCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<TeamsByCurrentUserQuery, TeamsByCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsByCurrentUserQuery, TeamsByCurrentUserQueryVariables>(TeamsByCurrentUserDocument, options);
      }
export function useTeamsByCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsByCurrentUserQuery, TeamsByCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsByCurrentUserQuery, TeamsByCurrentUserQueryVariables>(TeamsByCurrentUserDocument, options);
        }
export type TeamsByCurrentUserQueryHookResult = ReturnType<typeof useTeamsByCurrentUserQuery>;
export type TeamsByCurrentUserLazyQueryHookResult = ReturnType<typeof useTeamsByCurrentUserLazyQuery>;
export type TeamsByCurrentUserQueryResult = Apollo.QueryResult<TeamsByCurrentUserQuery, TeamsByCurrentUserQueryVariables>;
export const UserTodosByCurrentUserDocument = gql`
    query UserTodosByCurrentUser {
  userTodosByCurrentUser {
    _id
    content
    createdAt
    completedAt
  }
}
    `;

/**
 * __useUserTodosByCurrentUserQuery__
 *
 * To run a query within a React component, call `useUserTodosByCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTodosByCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTodosByCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTodosByCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<UserTodosByCurrentUserQuery, UserTodosByCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTodosByCurrentUserQuery, UserTodosByCurrentUserQueryVariables>(UserTodosByCurrentUserDocument, options);
      }
export function useUserTodosByCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTodosByCurrentUserQuery, UserTodosByCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTodosByCurrentUserQuery, UserTodosByCurrentUserQueryVariables>(UserTodosByCurrentUserDocument, options);
        }
export type UserTodosByCurrentUserQueryHookResult = ReturnType<typeof useUserTodosByCurrentUserQuery>;
export type UserTodosByCurrentUserLazyQueryHookResult = ReturnType<typeof useUserTodosByCurrentUserLazyQuery>;
export type UserTodosByCurrentUserQueryResult = Apollo.QueryResult<UserTodosByCurrentUserQuery, UserTodosByCurrentUserQueryVariables>;