import { gql } from 'graphql-tag';

const typeDefs = gql`
  type MeetingPrep {
    _id: String!
    topics: [String!]!
  }

  input MeetingPrepInput {
    personId: String!
  }

  input AddMeetingPrepTopicInput {
    personId: String!
    topic: String!
  }

  type AddMeetingPrepTopicResponse {
    success: Boolean!
    error: String
    meetingPrep: MeetingPrep
  }

  extend type Mutation {
    addMeetingPrepTopic(input: AddMeetingPrepTopicInput!): AddMeetingPrepTopicResponse
  }

  extend type Query {
    meetingPrep(input: MeetingPrepInput!): MeetingPrep
  }
`;

export default typeDefs;
