import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Feedback {
    _id: String!
    createdAt: DateTime!
    content: String!
    type: String!
  }

  input CreateFeedbackInput {
    personId: String!
    type: String!
    content: String!
  }

  type CreateFeedbackResponse {
    error: String
    feedback: Feedback
    success: Boolean!
  }

  input DeleteFeedbackInput {
    feedbackId: String!
  }

  type DeleteFeedbackResponse {
    error: String
    success: Boolean!
  }

  input FeedbackInput {
    feedbackId: String!
  }

  input UpdateFeedbackInput {
    feedbackId: String!
    content: String!
    type: String!
  }

  type UpdateFeedbackResponse {
    error: String
    feedback: Feedback
    success: Boolean!
  }

  extend type Mutation {
    createFeedback(input: CreateFeedbackInput!): CreateFeedbackResponse!
    deleteFeedback(input: DeleteFeedbackInput!): DeleteFeedbackResponse!
    updateFeedback(input: UpdateFeedbackInput!): UpdateFeedbackResponse!
  }

  extend type Query {
    feedback(input: FeedbackInput!): Feedback
  }
`;

export default typeDefs;
