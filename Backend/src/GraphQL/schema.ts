import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolver";
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
    likes: Int!
  }

  type Query {
    _empty: String
  }

  type Subscription {
    bookLiked: Book
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
