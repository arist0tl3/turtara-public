import { gql } from 'graphql-tag';

const typeDefs = gql`
  type UserTodo {
    _id: String!
    createdAt: DateTime!
    content: String!
    completedAt: DateTime
  }

  input CreateUserTodoInput {
    content: String!
  }

  type CreateUserTodoResponse {
    error: String
    success: Boolean!
    todo: UserTodo
  }

  input CompleteUserTodoInput {
    todoId: String!
  }

  type CompleteUserTodoResponse {
    error: String
    success: Boolean!
    todo: UserTodo
  }

  input UncompleteUserTodoInput {
    todoId: String!
  }

  type UncompleteUserTodoResponse {
    error: String
    success: Boolean!
    todo: UserTodo
  }

  extend type Mutation {
    createUserTodo(input: CreateUserTodoInput!): CreateUserTodoResponse!
    completeUserTodo(input: CompleteUserTodoInput!): CompleteUserTodoResponse!
    uncompleteUserTodo(input: UncompleteUserTodoInput!): UncompleteUserTodoResponse!
  }

  extend type Query {
    userTodosByCurrentUser: [UserTodo!]!
  }
`;

export default typeDefs;
