import { PubSub } from 'graphql-subscriptions';
import { NatsJetStreamPubSub } from './natsPubSub';

const pubsub = new NatsJetStreamPubSub();

interface Deal { id: string; name: string; status: string; }

const deals: Deal[] = [];

export default {
  Query: {
    deals: () => deals,
    attachments: (_: any, { dealId }: { dealId: string }) => [],
    scores: (_: any, { dealId }: { dealId: string }) => ({ dealId, value: 0 }),
  },
  Mutation: {
    createDeal: (_: any, { name }: { name: string }) => {
      const newDeal = { id: Date.now().toString(), name, status: 'NEW' };
      deals.push(newDeal);
      pubsub.publish('dealUpdates', newDeal);
      return newDeal;
    },
    updateDeal: (_: any, { id, name, status }: Deal) => {
      const deal = deals.find(d => d.id === id);
      if (!deal) throw new Error('not found');
      if (name) deal.name = name;
      if (status) deal.status = status;
      pubsub.publish('dealUpdates', deal);
      return deal;
    },
  },
  Subscription: {
    dealUpdates: {
      subscribe: () => pubsub.subscribe('dealUpdates', () => {}),
      resolve: (payload: Deal) => payload,
    },
    attachmentUpdates: {
      subscribe: () => pubsub.subscribe('attachmentUpdates', () => {}),
      resolve: (payload: any) => payload,
    },
    scoreUpdates: {
      subscribe: () => pubsub.subscribe('scoreUpdates', () => {}),
      resolve: (payload: any) => payload,
    },
  },
};
