export interface Deal {
  id: string;
  sector: string;
  region: string;
  ticketSize: number;
  irr: number;
  tenor: number;
  esgScore: number;
  riskGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  fundable: boolean;
  updatedAt: Date;
}

export interface DealFilter {
  sector?: string;
  region?: string;
  ticketSizeMin?: number;
  ticketSizeMax?: number;
  irrMin?: number;
  tenorMax?: number;
  esgScoreMin?: number;
  riskGrade?: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface PageInput {
  limit: number;
  offset: number;
}
