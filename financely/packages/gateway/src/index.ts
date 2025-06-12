import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers';
import { userResolvers } from './userResolvers';

const typeDefs = readFileSync(__dirname + '/schema.graphql', 'utf8');

const mergedResolvers = { ...resolvers, ...userResolvers };

const server = new ApolloServer({ typeDefs, resolvers: mergedResolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});
