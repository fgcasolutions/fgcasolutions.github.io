import { handleDealMatched } from './index';

test('handleDealMatched runs', async () => {
  await handleDealMatched({ sponsor: 'ACME', investor: 'XYZ', recipients: ['test@example.com'] });
});
