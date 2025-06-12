import { sendEmail } from '../src/index';
import { SES } from 'aws-sdk';

describe('notification service', () => {
  it('uses SES to send email', async () => {
    const ses = {
      sendEmail: jest.fn().mockReturnValue({ promise: () => Promise.resolve() }),
    } as unknown as SES;
    await sendEmail(ses, 'a@b.com', 'sub', '<p>Hi</p>');
    expect((ses as any).sendEmail).toHaveBeenCalled();
  });
});
