import { gql } from 'graphql-tag';

const typeDefs = gql`
  type TeamInsightTeamLevelReport {
    sprintId: Int
    score: Int
    summary: String
  }

  type TeamInsightIndividualLevelReport {
    personId: String
    person: Person
    score: Int
    summary: String
  }

  type TeamInsightIssueAnomalyReport {
    issueId: String
    severity: Int
    summary: String
  }

  type TeamInsight {
    _id: String!
    createdAt: DateTime!

    teamLevelReport: [TeamInsightTeamLevelReport!]!
    individualLevelReport: [TeamInsightIndividualLevelReport!]!
    issueAnomaliesReport: [TeamInsightIssueAnomalyReport!]!
    observationsReport: [String!]!

    teamId: String!
  }

  type GenerateTeamInsightResponse {
    error: String
    teamInsight: TeamInsight
    success: Boolean!
  }

  input GenerateTeamInsightInput {
    teamId: String!
  }

  input RecentTeamInsightInput {
    teamId: String!
  }

  extend type Mutation {
    generateTeamInsight(input: GenerateTeamInsightInput!): GenerateTeamInsightResponse!
  }

  extend type Query {
    recentTeamInsight(input: RecentTeamInsightInput!): TeamInsight!
  }
`;

export default typeDefs;
