import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { getDeals, saveDeal } from './db';
import { DealFilter, PageInput, Deal } from './types';
import { indexDeal } from './es';
import { publish } from './nats';
import { scoreDeal } from './scoring';

export const typeDefs = gql`
  enum RiskGrade { A B C D E }
  input DealFilter { sector: String region: String ticketSizeMin: Float ticketSizeMax: Float irrMin: Float tenorMax: Float esgScoreMin: Float riskGrade: RiskGrade }
  input PageInput { limit: Int!, offset: Int! }
  type Deal { id: ID!, sector: String, region: String, ticketSize: Float, irr: Float, tenor: Float, esgScore: Float, riskGrade: RiskGrade, fundable: Boolean, updatedAt: String }
  type Query { deals(filter: DealFilter, page: PageInput): [Deal!]! }
`;

export const resolvers = {
  Query: {
    deals: (_: any, { filter, page }: { filter: DealFilter; page: PageInput }) => getDeals(filter || {}, page || { limit: 10, offset: 0 }),
  },
};

export async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await startStandaloneServer(server, { listen: { port: 4001 } });
  console.log('Deal service ready');
}

export async function saveAndIndexDeal(deal: Deal) {
  await saveDeal(deal);
  await indexDeal(deal);
  await publish('DEAL_SAVED', deal);
}

export function computeFundable(factors: { liquidity: number; covenantStrength: number; sponsorTrack: number; override?: boolean; }): boolean {
  return scoreDeal(factors);
}
