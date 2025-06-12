import { startServer } from './index';
jest.mock('nats', () => ({ connect: jest.fn().mockResolvedValue({ publish: jest.fn(), drain: jest.fn() }) }));

test('server starts', async () => {
  const server = await startServer();
  expect(server).toBeTruthy();
});
