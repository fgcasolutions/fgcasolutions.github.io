import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Deal {
    id: ID!
    name: String!
  }
  type Query {
    deals: [Deal!]!
  }
`;
