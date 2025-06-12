import { connect, JSONCodec } from 'nats';
import { initTelemetry } from '../../packages/common/telemetry';

async function main() {
  initTelemetry();
  const nc = await connect({ servers: 'nats://localhost:4222' });
  const jc = JSONCodec();

  const sub = nc.subscribe('DEAL_MATCHED');
  for await (const msg of sub) {
    const data = jc.decode(msg.data) as any;
    console.log('Received match', data);
    // TODO: implement business rules
  }
}

main();
