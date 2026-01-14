import { gql } from 'graphql-tag';

const typeDefs = gql`
  type PersonGoal {
    _id: String!
    content: String!
    createdAt: DateTime!
    targetDate: DateTime!
  }

  input CreatePersonGoalInput {
    content: String!
    personId: String!
    targetDate: DateTime!
  }

  type CreatePersonGoalResponse {
    personGoal: PersonGoal
    error: String
    success: Boolean!
  }

  input DeletePersonGoalInput {
    personGoalId: String!
  }

  type DeletePersonGoalResponse {
    error: String
    success: Boolean!
  }

  input PersonGoalInput {
    personGoalId: String!
  }

  input UpdatePersonGoalInput {
    content: String!
    personGoalId: String!
    targetDate: DateTime!
  }

  type UpdatePersonGoalResponse {
    error: String
    personGoal: PersonGoal
    success: Boolean!
  }

  extend type Mutation {
    createPersonGoal(input: CreatePersonGoalInput!): CreatePersonGoalResponse!
    deletePersonGoal(input: DeletePersonGoalInput!): DeletePersonGoalResponse!
    updatePersonGoal(input: UpdatePersonGoalInput!): UpdatePersonGoalResponse!
  }

  extend type Query {
    personGoal(input: PersonGoalInput!): PersonGoal
  }
`;

export default typeDefs;
