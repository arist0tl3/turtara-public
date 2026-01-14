import { gql } from 'graphql-tag';

const typeDefs = gql`
  type TimeInColumn {
    columnName: String
    elapsedTime: Float
  }

  type Issue {
    id: String!
    key: String!
    self: String

    ## Calculated in transformIssue
    assigneeName: String
    cycleTime: Float
    cycleTimePerPoint: Float
    endedAt: DateTime
    personId: String
    # sprint: Sprint
    startedAt: DateTime
    storyPoints: Float
    summary: String
    timesInColumns: [TimeInColumn!]!
  }

  type GetSprintsResponse {
    success: Boolean!
    error: String
  }

  type Query {
    getSprints: GetSprintsResponse!
  }
`;

export default typeDefs;
