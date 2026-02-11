import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Team {
    _id: String!
    createdAt: DateTime!
    name: String!

    people: [Person!]
    profileImageSrc: String
  }

  input CreateTeamInput {
    name: String!
  }

  type CreateTeamResponse {
    error: String
    success: Boolean!
    team: Team
  }

  input DeleteTeamInput {
    teamId: String!
  }

  type DeleteTeamResponse {
    error: String
    success: Boolean!
  }

  input TeamInput {
    teamId: String!
  }

  input UpdateTeamInput {
    name: String!
    teamId: String!
    profileImageSrc: String
  }

  type UpdateTeamResponse {
    error: String
    team: Team
    success: Boolean!
  }

  extend type Mutation {
    createTeam(input: CreateTeamInput!): CreateTeamResponse!
    deleteTeam(input: DeleteTeamInput!): DeleteTeamResponse!
    updateTeam(input: UpdateTeamInput!): UpdateTeamResponse!
  }

  extend type Query {
    team(input: TeamInput!): Team
    teamsByCurrentUser: [Team!]
  }
`;

export default typeDefs;
