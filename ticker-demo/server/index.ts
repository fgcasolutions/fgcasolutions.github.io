import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { NatsJetStreamPubSub } from './natsPubSub';
import resolvers from './resolvers';

// Load GraphQL schema from file
const typeDefs = readFileSync(require.resolve('./schema.graphql'), 'utf8');

// Initialize PubSub backed by NATS JetStream
const pubsub = new NatsJetStreamPubSub();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [pubsub.plugin()],
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
