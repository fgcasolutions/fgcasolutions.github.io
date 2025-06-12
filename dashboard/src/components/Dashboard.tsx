import React from 'react';
export interface DealCardProps { id: string; fundable: boolean; updatedAt: string; }
export const DealCard: React.FC<DealCardProps> = ({ id, fundable, updatedAt }) => (
  <div className="card">
    <h3>{id}</h3>
    {fundable && <span>Fundable</span>}
    <small>{updatedAt}</small>
  </div>
);

export const InvestorDashboard: React.FC<{ deals: DealCardProps[] }> = ({ deals }) => (
  <div>
    <h2>Investor Dashboard</h2>
    <div className="grid">
      {deals.map(d => <DealCard key={d.id} {...d} />)}
    </div>
  </div>
);
