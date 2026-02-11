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

  type CurrentUser {
    _id: String!
    createdAt: DateTime
    email: String
    phoneNumber: String
  }

  input UpdateCurrentUserInput {
    email: String
    phoneNumber: String
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

  extend type Mutation {
    login(input: LoginInput!): LoginResponse!
    register(input: RegisterInput!): RegisterResponse!
    updateCurrentUser(input: UpdateCurrentUserInput!): UpdateCurrentUserResponse!
    logout: LogoutResponse!
  }

  extend type Query {
    currentUser: CurrentUser
    dashboard: Dashboard
  }
`;

export default typeDefs;
