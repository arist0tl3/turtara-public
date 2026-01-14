import { gql } from 'graphql-tag';

const typeDefs = gql`
  type PersonNote {
    _id: String!
    content: String!
    createdAt: DateTime!
  }

  input CreatePersonNoteInput {
    content: String!
    personId: String!
  }

  type CreatePersonNoteResponse {
    personNote: PersonNote
    error: String
    success: Boolean!
  }

  input DeletePersonNoteInput {
    personNoteId: String!
  }

  type DeletePersonNoteResponse {
    error: String
    success: Boolean!
  }

  input PersonNoteInput {
    personNoteId: String!
  }

  input UpdatePersonNoteInput {
    content: String!
    personNoteId: String!
  }

  type UpdatePersonNoteResponse {
    error: String
    personNote: PersonNote
    success: Boolean!
  }

  extend type Mutation {
    createPersonNote(input: CreatePersonNoteInput!): CreatePersonNoteResponse!
    deletePersonNote(input: DeletePersonNoteInput!): DeletePersonNoteResponse!
    updatePersonNote(input: UpdatePersonNoteInput!): UpdatePersonNoteResponse!
  }

  extend type Query {
    personNote(input: PersonNoteInput!): PersonNote
  }
`;

export default typeDefs;
