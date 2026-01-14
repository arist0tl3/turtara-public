import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Role {
    _id: String!
    createdAt: DateTime!
    name: String!
  }

  input CreateRoleInput {
    name: String!
  }

  type CreateRoleResponse {
    error: String
    success: Boolean!
    role: Role
  }

  input DeleteRoleInput {
    roleId: String!
  }

  type DeleteRoleResponse {
    error: String
    success: Boolean!
  }

  input RoleInput {
    roleId: String!
  }

  input UpdateRoleInput {
    name: String!
    roleId: String!
  }

  type UpdateRoleResponse {
    error: String
    role: Role
    success: Boolean!
  }

  extend type Mutation {
    createRole(input: CreateRoleInput!): CreateRoleResponse!
    deleteRole(input: DeleteRoleInput!): DeleteRoleResponse!
    updateRole(input: UpdateRoleInput!): UpdateRoleResponse!
  }

  extend type Query {
    role(input: RoleInput!): Role
    rolesByCurrentUser: [Role!]
  }
`;

export default typeDefs;
