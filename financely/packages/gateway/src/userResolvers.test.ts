import { userResolvers } from './userResolvers';

describe('userResolvers', () => {
  it('registerUser hashes password', async () => {
    const res = await userResolvers.Mutation.registerUser(null, { input: { email: 'a@b.com', password: 'pass' }});
    expect(res.password).not.toBe('pass');
  });
});
