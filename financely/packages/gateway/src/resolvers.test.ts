import { resolvers } from './resolvers';

describe('resolvers', () => {
  it('returns empty deals list', async () => {
    const result = await resolvers.Query.deals();
    expect(result).toEqual([]);
  });
});
