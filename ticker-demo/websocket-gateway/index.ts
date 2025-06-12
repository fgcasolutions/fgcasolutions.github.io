import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { execute, subscribe } from 'graphql';
import { schema } from '../server';

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  socket.on('message', async (data) => {
    const { query, variables } = JSON.parse(data.toString());
    const iterator = await subscribe({ schema, document: query, variableValues: variables });

    for await (const result of iterator as any) {
      socket.send(JSON.stringify(result));
    }
  });
});

server.listen(4001, () => console.log('WebSocket gateway ready on 4001'));
