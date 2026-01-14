import { gql } from 'graphql-tag';

const typeDefs = gql`
  type SprintIssueTimeInStatus {
    status: String
    timeInStatus: Float
  }

  type SprintIssue {
    id: String
    createdAt: DateTime
    cycleTime: Float
    devCycleTime: Float
    qaCycleTime: Float
    codeReviewCycleTime: Float
    readyForQACycleTime: Float
    key: String
    personId: String
    person: Person
    resolvedAt: DateTime
    status: String
    storyPoints: Int
    timeInStatuses: [SprintIssueTimeInStatus!]!
  }

  type SprintContribution {
    personId: String
    person: Person
    averageCycleTime: Float
    storyPoints: Int
    issueCount: Int
  }

  type Sprint {
    id: Int!
    contributions: [SprintContribution!]!
    name: String!
    state: String
    boardId: Int!
    goal: String
    startDate: DateTime!
    endDate: DateTime
    completeDate: DateTime
    issues: [SprintIssue!]!
    devCycleTime: Float
    qaCycleTime: Float
    codeReviewCycleTime: Float
    readyForQACycleTime: Float
  }

  type PersonPerformance {
    personId: String
    averageCycleTime: Float
    averageDevCycleTime: Float
    averageCycleTimePerStoryPoint: Float
    averageDevCycleTimePerStoryPoint: Float
  }

  type TeamPerformance {
    recentIssuesBySprint: [Sprint!]!
    individualPerformance: [PersonPerformance!]!
  }

  type Team {
    _id: String!
    createdAt: DateTime!
    name: String!

    people: [Person!]
    performance: TeamPerformance
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
