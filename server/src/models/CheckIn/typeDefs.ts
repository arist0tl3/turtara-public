import { gql } from 'graphql-tag';

const typeDefs = gql`
  type CheckIn {
    _id: String!
    createdAt: DateTime!
    createdById: String!
    deleted: Boolean
    deletedAt: DateTime
    deletedById: String

    personId: String!
    weeklyGoal: String!
    meetingRequested: Boolean!
    meetingRequestedReasons: [String!]!
    weeklyConfidence: Int!
    weeklyConfidenceReason: String
  }

  input CreateCheckInInput {
    personId: String!
    weeklyGoal: String!
    meetingRequested: Boolean!
    meetingRequestedReasons: [String!]!
    weeklyConfidence: Int!
    weeklyConfidenceReason: String
  }

  type CreateCheckInResponse {
    checkIn: CheckIn
    error: String
    success: Boolean!
  }

  input DeleteCheckInInput {
    checkInId: String!
  }

  type DeleteCheckInResponse {
    error: String
    success: Boolean!
  }

  input CheckInInput {
    checkInId: String!
  }

  extend type Mutation {
    createCheckIn(input: CreateCheckInInput!): CreateCheckInResponse!
    deleteCheckIn(input: DeleteCheckInInput!): DeleteCheckInResponse!
  }

  extend type Query {
    checkIn(input: CheckInInput!): CheckIn
  }
`;

export default typeDefs;
