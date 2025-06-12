import { gql, useQuery } from '@apollo/client';

const DEALS_QUERY = gql`
  query Deals {
    deals {
      id
      name
    }
  }
`;

export function useDeals() {
  return useQuery(DEALS_QUERY);
}
