import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getBooks: [Book]
    getBookById(id: ID!): Book
  }

  type Mutation {
    createBook(payload: Book): Book
    deleteBook(id: ID!): Book
    updateBook(id: ID!): Book
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    price: Number!
    cover: String!
  }
`;
