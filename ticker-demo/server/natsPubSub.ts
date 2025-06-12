import { connect, StringCodec } from 'nats';
import { PubSubEngine } from 'graphql-subscriptions';

export class NatsJetStreamPubSub implements PubSubEngine {
  private sc = StringCodec();
  private events = new Map<string, Array<(payload: any) => void>>();

  async plugin() {
    const nc = await connect({ servers: 'nats://localhost:4222' });
    const js = nc.jetstream();

    nc.subscribe('graphql.>', { callback: (err, msg) => {
      if (err) return;
      const [_, topic] = msg.subject.split('graphql.');
      const payload = JSON.parse(this.sc.decode(msg.data));
      this.events.get(topic)?.forEach(fn => fn(payload));
    }});

    return {
      async serverWillStart() {
        return () => nc.close();
      },
    };
  }

  async publish(triggerName: string, payload: any) {
    const nc = await connect({ servers: 'nats://localhost:4222' });
    const js = nc.jetstream();
    await js.publish(`graphql.${triggerName}`, this.sc.encode(JSON.stringify(payload)));
    await nc.close();
  }

  async subscribe(triggerName: string, onMessage: (payload: any) => void) {
    const key = triggerName;
    if (!this.events.has(key)) this.events.set(key, []);
    this.events.get(key)!.push(onMessage);
    return this.events.get(key)!.length;
  }

  unsubscribe() {
    // no-op for demo
  }
}
