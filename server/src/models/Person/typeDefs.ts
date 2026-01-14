import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Repository {
    id: String!
    name: String!
    url: String!
  }

  type PRScore {
    id: String!
    score: Float
    role: String!
  }

  type GithubScore {
    total: Float
    author: Float
    reviewer: Float
    prCount: Int
    authorCount: Int
    reviewerCount: Int
    meaningfulReviewRatio: Float
    balanceMultiplier: Float
    prScores: [PRScore!]
    totalDelta: Float
    authorDelta: Float
    reviewerDelta: Float
  }

  type GithubData {
    pullRequests: [PullRequest!]
    githubScore: GithubScore
  }

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

    currentIssues: [Issue!]
    pastIssues: [Issue!]

    feedback: [Feedback!]

    teamId: String
    team: Team

    roleId: String
    role: Role

    githubHandle: String
    githubData: GithubData

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
