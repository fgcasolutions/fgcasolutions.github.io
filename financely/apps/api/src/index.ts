import { ApolloServer, gql } from 'apollo-server';
import { connect } from 'nats';
import fs from 'fs';
import path from 'path';
import { initTelemetry } from '../../../packages/common/telemetry';

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const resolvers = {
  Query: {
    hello: () => 'Hello from Financely',
  },
};

export async function startServer() {
  initTelemetry();
  const nats = await connect({ servers: 'nats://localhost:4222' });

  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
  return server;
}

if (require.main === module) {
  startServer();
}
