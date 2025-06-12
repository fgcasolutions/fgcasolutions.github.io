import { hashPassword } from './security';
import { verifyWithTrulioo } from './kyc';

export const userResolvers = {
  Mutation: {
    registerUser: async (_: any, { input }: any) => {
      // TODO: store user in Postgres
      await verifyWithTrulioo(input);
      const hashed = await hashPassword(input.password);
      return { id: 'u1', email: input.email, password: hashed };
    }
  }
};
