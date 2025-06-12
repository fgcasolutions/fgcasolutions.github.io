import { Client } from '@elastic/elasticsearch';
import { Deal } from './types';

export const es = new Client({ node: process.env.ES_URL || 'http://localhost:9200' });

export async function indexDeal(deal: Deal) {
  await es.index({ index: 'deals', id: deal.id, document: {
    sector: deal.sector,
    region: deal.region,
    ticketSize: deal.ticketSize,
    irr: deal.irr,
    tenor: deal.tenor,
    esgScore: deal.esgScore,
    riskGrade: deal.riskGrade,
    fundable: deal.fundable,
    updatedAt: deal.updatedAt,
  }});
}
