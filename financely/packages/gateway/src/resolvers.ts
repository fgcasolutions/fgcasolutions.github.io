export const resolvers = {
  Query: {
    deals: async () => {
      // TODO: fetch from business-service via GraphQL federation or REST
      return [];
    }
  },
  Mutation: {
    createDeal: async (_: any, { input }: any) => {
      // TODO: implement creation logic
      return { id: '1', name: input.name };
    }
  }
};
