import { gql } from 'graphql-tag';

const typeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    success: Boolean!
    token: String
    error: String
  }

  type RegisterResponse {
    success: Boolean!
    token: String
    error: String
  }

  type LogoutResponse {
    success: Boolean!
    error: String
  }

  type JiraColumnGroup {
    _id: String!
    name: String
  }

  type JiraColumn {
    _id: String!
    name: String
    jiraColumnGroupId: String
    jiraColumnGroup: JiraColumnGroup
    first: Boolean
    last: Boolean
  }

  type CurrentUser {
    _id: String!
    createdAt: DateTime
    email: String
    phoneNumber: String
    jiraHost: String
    jiraEmail: String
    hasJiraToken: Boolean
    hasGithubToken: Boolean
    githubOrganization: String
    jiraColumnGroups: [JiraColumnGroup]
    jiraColumns: [JiraColumn]
  }

  input JiraColumnGroupInput {
    name: String!
  }

  input JiraColumnInput {
    name: String!
    jiraColumnGroupId: String
    first: Boolean
    last: Boolean
  }

  input UpdateCurrentUserInput {
    email: String
    password: String
    jiraHost: String
    jiraEmail: String
    jiraToken: String
    githubToken: String
    githubOrganization: String
  }

  type UpdateCurrentUserResponse {
    success: Boolean!
    currentUser: CurrentUser
    error: String
  }

  type OutstandingMeetingReport {
    _id: String!
    firstName: String!
    lastName: String!
    profileImageSrc: String
    lastMeetingDate: DateTime
  }

  type Dashboard {
    outstandingMeetingReports: [OutstandingMeetingReport!]!
  }

  type UpdateGithubDataResponse {
    success: Boolean!
    error: String
  }

  extend type Mutation {
    login(input: LoginInput!): LoginResponse!
    register(input: RegisterInput!): RegisterResponse!
    updateCurrentUser(input: UpdateCurrentUserInput!): UpdateCurrentUserResponse!
    logout: LogoutResponse!
    updateGithubData: UpdateGithubDataResponse!
  }

  extend type Query {
    currentUser: CurrentUser
    dashboard: Dashboard
  }
`;

export default typeDefs;
