import React from 'react';
import { useLiveDeal, Providers } from '../hooks/useLiveDeal';
import { dealMatched$ } from '../../notification-service';

export default {
  title: 'Dashboard/DealMatch',
};

const Dashboard = ({ dealId }: { dealId: string }) => {
  const deal = useLiveDeal(dealId);

  React.useEffect(() => {
    const sub = dealMatched$.subscribe(() => {
      console.log('Deal matched, turning dashboard green');
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div style={{ background: deal.status === 'MATCHED' ? 'green' : 'white' }}>
      <h3>{deal.name}</h3>
      <p>Status: {deal.status}</p>
    </div>
  );
};

export const LiveMatch = () => (
  <Providers>
    <Dashboard dealId="1" />
  </Providers>
);
