import { Pool } from 'pg';
import { Deal, DealFilter, PageInput } from './types';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function saveDeal(deal: Deal): Promise<void> {
  await pool.query(
    `INSERT INTO deals (id, sector, region, ticket_size, irr, tenor, esg_score, risk_grade, fundable, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (id) DO UPDATE SET
       sector = EXCLUDED.sector,
       region = EXCLUDED.region,
       ticket_size = EXCLUDED.ticket_size,
       irr = EXCLUDED.irr,
       tenor = EXCLUDED.tenor,
       esg_score = EXCLUDED.esg_score,
       risk_grade = EXCLUDED.risk_grade,
       fundable = EXCLUDED.fundable,
       updated_at = EXCLUDED.updated_at`,
    [deal.id, deal.sector, deal.region, deal.ticketSize, deal.irr, deal.tenor, deal.esgScore, deal.riskGrade, deal.fundable, deal.updatedAt],
  );
}

export async function getDeals(filter: DealFilter, page: PageInput): Promise<Deal[]> {
  const values: any[] = [];
  const where: string[] = [];
  if (filter.sector) { values.push(filter.sector); where.push(`sector = $${values.length}`); }
  if (filter.region) { values.push(filter.region); where.push(`region = $${values.length}`); }
  if (filter.ticketSizeMin !== undefined) { values.push(filter.ticketSizeMin); where.push(`ticket_size >= $${values.length}`); }
  if (filter.ticketSizeMax !== undefined) { values.push(filter.ticketSizeMax); where.push(`ticket_size <= $${values.length}`); }
  if (filter.irrMin !== undefined) { values.push(filter.irrMin); where.push(`irr >= $${values.length}`); }
  if (filter.tenorMax !== undefined) { values.push(filter.tenorMax); where.push(`tenor <= $${values.length}`); }
  if (filter.esgScoreMin !== undefined) { values.push(filter.esgScoreMin); where.push(`esg_score >= $${values.length}`); }
  if (filter.riskGrade) { values.push(filter.riskGrade); where.push(`risk_grade = $${values.length}`); }

  values.push(page.limit, page.offset);
  const w = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const res = await pool.query<Deal>(
    `SELECT * FROM deals ${w} ORDER BY updated_at DESC LIMIT $${values.length-1} OFFSET $${values.length}`,
    values,
  );
  return res.rows;
}
