import { connect, StringCodec, NatsConnection } from 'nats';

const sc = StringCodec();
let nc: NatsConnection | null = null;

export async function getConnection() {
  if (!nc) {
    nc = await connect({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
  }
  return nc;
}

export async function publish(subject: string, data: object) {
  const conn = await getConnection();
  conn.publish(subject, sc.encode(JSON.stringify(data)));
}
