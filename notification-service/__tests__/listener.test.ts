import { processEvent } from '../src/index';
import { SES, S3 } from 'aws-sdk';

jest.mock('aws-sdk');

describe('event processing', () => {
  it('uploads pdf and sends emails', async () => {
    const s3Put = jest.fn().mockReturnValue({ promise: () => Promise.resolve() });
    const s3Get = jest.fn().mockReturnValue('url');
    (S3 as any).mockImplementation(() => ({ putObject: s3Put, getSignedUrl: s3Get }));
    const sesSend = jest.fn().mockReturnValue({ promise: () => Promise.resolve() });
    (SES as any).mockImplementation(() => ({ sendEmail: sesSend }));
    const nc = { publish: jest.fn() } as any;
    const pg = { query: jest.fn() } as any;
    await processEvent({ dealId: '1', sponsorId: 's', investorIds: ['i'] }, { s3: new S3(), ses: new SES(), pg, nc });
    expect(s3Put).toHaveBeenCalled();
    expect(sesSend).toHaveBeenCalled();
  });
});
