import { useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import useWebSocket from 'react-use-websocket';
import create from 'zustand';

interface Deal {
  id: string;
  name: string;
  status: string;
}

const queryClient = new QueryClient();

export const useDealStore = create<{ deals: Record<string, Deal> }>(() => ({
  deals: {},
}));

export function useLiveDeal(dealId: string) {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket('ws://localhost:4001');

  const { data } = useQuery(['deal', dealId], () => fetch(`/api/deals/${dealId}`).then(r => r.json()), {
    suspense: true,
  });

  useEffect(() => {
    sendJsonMessage({ query: `subscription { dealUpdates(dealId: "${dealId}") { id name status } }` });
  }, [dealId, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage?.data?.dealUpdates) {
      queryClient.setQueryData(['deal', dealId], lastJsonMessage.data.dealUpdates);
    }
  }, [lastJsonMessage, dealId]);

  return data as Deal;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
