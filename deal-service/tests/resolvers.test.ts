import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { jest } from '@jest/globals';

jest.mock('../src/nats', () => ({ publish: jest.fn() }));

jest.mock('../src/db', () => ({
  getDeals: jest.fn(async () => [{ id: '1', sector: 'Energy', region: 'EMEA', ticketSize: 100, irr: 0.1, tenor: 12, esgScore: 80, riskGrade: 'A', fundable: true, updatedAt: new Date() }])
}));

const { typeDefs, resolvers } = require('../src/resolvers');

describe('deals query', () => {
  it('returns deals from mocked db', async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    const result: any = await server.executeOperation({ query: gql`{ deals { id } }` });
    const data = result.body.singleResult.data;
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(data.deals[0].id).toBe('1');
  });
});
