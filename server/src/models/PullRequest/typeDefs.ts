import { gql } from 'graphql-tag';

const typeDefs = gql`
  type PullRequest {
    _id: String!
    githubId: String!
    createdAt: DateTime!
    mergedAt: DateTime
    permalink: String!
    repository: Repository!
    title: String!
    additions: Int
    deletions: Int
    role: String
    reviewCommentCount: Int
  }
`;

export default typeDefs;
