import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getBooks: [Book]
    getBookById(id: ID!): Book
  }

  type Mutation {
    createBook(payload: BookInput!): Book
    deleteBook(id: ID!): ID!
    updateBook(payload: UpdateBookInput!): Book
  }

  input BookInput {
    title: String!
    author: String!
    description: String!
    price: Int!
    cover: String!
  }

  input UpdateBookInput {
    id: ID!
    title: String
    author: String
    description: String
    price: Int
    cover: String
  }

  type Book {
    id: ID
    title: String
    author: String
    description: String
    price: Int
    cover: String
  }
`;
