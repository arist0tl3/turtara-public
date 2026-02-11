import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Person {
    _id: String!
    firstName: String!
    lastName: String!
    partners: String
    pets: String
    kids: String
    profileImageSrc: String

    personNotes: [PersonNote!]
    personGoals: [PersonGoal!]

    feedback: [Feedback!]

    teamId: String
    team: Team

    roleId: String
    role: Role

    githubHandle: String

    reportsToMe: Boolean!

    checkIns: [CheckIn!]
  }

  input CreatePersonInput {
    firstName: String!
    lastName: String!
    teamId: ID
    roleId: ID
    githubHandle: String
    reportsToMe: Boolean
  }

  type CreatePersonResponse {
    person: Person
    error: String
    success: Boolean!
  }

  input UpdatePersonInput {
    personId: String!
    firstName: String
    lastName: String
    partners: String
    pets: String
    kids: String
    profileImageSrc: String
    teamId: String
    githubHandle: String
    roleId: String
    reportsToMe: Boolean
  }

  type UpdatePersonResponse {
    person: Person
    error: String
    success: Boolean!
  }

  input DeletePersonInput {
    personId: String!
  }

  type DeletePersonResponse {
    error: String
    success: Boolean!
  }

  input PersonInput {
    personId: String!
  }

  extend type Mutation {
    createPerson(input: CreatePersonInput!): CreatePersonResponse!
    deletePerson(input: DeletePersonInput!): DeletePersonResponse!
    updatePerson(input: UpdatePersonInput!): UpdatePersonResponse!
  }

  extend type Query {
    peopleByCurrentUser: [Person!]
    person(input: PersonInput!): Person
  }
`;

export default typeDefs;
