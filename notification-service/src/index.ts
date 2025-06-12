import { connect, JSONCodec, NatsConnection } from 'nats';
import { S3, SES } from 'aws-sdk';
import sgMail from '@sendgrid/mail';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import mjml2html from 'mjml';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const jc = JSONCodec();

interface DealMatchedEvent {
  dealId: string;
  sponsorId: string;
  investorIds: string[];
}

interface NotificationRecord {
  id: string;
  dealId: string;
  sponsorId: string;
  investorId: string;
  sentAt: Date;
}

async function generatePdf(dealId: string): Promise<Buffer> {
  const dummy = Buffer.from(`PDF for deal ${dealId}`);
  return dummy;
}

async function uploadToS3(s3: S3, buffer: Buffer): Promise<string> {
  const key = `notifications/${uuidv4()}.pdf`;
  await s3.putObject({
    Bucket: process.env.NOTIFICATION_BUCKET!,
    Key: key,
    Body: buffer,
    ServerSideEncryption: 'AES256',
    Expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  }).promise();
  const url = s3.getSignedUrl('getObject', {
    Bucket: process.env.NOTIFICATION_BUCKET!,
    Key: key,
    Expires: 90 * 24 * 60 * 60,
  });
  return url;
}

function compileTemplate(file: string, data: Record<string, any>): string {
  const source = fs.readFileSync(path.join(__dirname, '../templates', file), 'utf8');
  const mjml = Handlebars.compile(source)(data);
  const { html } = mjml2html(mjml);
  return html;
}

export async function sendEmail(ses: SES, to: string, subject: string, html: string) {
  try {
    await ses.sendEmail({
      Source: process.env.SES_FROM!,
      Destination: { ToAddresses: [to] },
      Message: { Subject: { Data: subject }, Body: { Html: { Data: html } } },
    }).promise();
  } catch (err) {
    if (err && (err as any).code === 'Throttling') {
      sgMail.setApiKey(process.env.SENDGRID_KEY!);
      await sgMail.send({ from: process.env.SES_FROM!, to, subject, html });
    } else {
      throw err;
    }
  }
}

async function audit(client: Client, record: NotificationRecord) {
  await client.query(
    'insert into notifications(id, deal_id, sponsor_id, investor_id, sent_at) values($1,$2,$3,$4,$5)',
    [record.id, record.dealId, record.sponsorId, record.investorId, record.sentAt]
  );
}

export async function processEvent(
  data: DealMatchedEvent,
  deps: { s3: S3; ses: SES; pg: Client; nc: NatsConnection }
) {
  const { s3, ses, pg, nc } = deps;
  const pdf = await generatePdf(data.dealId);
  const url = await uploadToS3(s3, pdf);

  const sponsorHtml = compileTemplate('sponsor.mjml', {
    sponsorId: data.sponsorId,
    url,
    // TODO: add copy once marketing approves
  });
  await sendEmail(ses, `${data.sponsorId}@example.com`, "You've got a match", sponsorHtml);

  for (const inv of data.investorIds) {
    const investorHtml = compileTemplate('investor.mjml', {
      firstName: inv,
      url,
      // TODO: add copy once marketing approves
    });
    await sendEmail(ses, `${inv}@example.com`, 'Deal locked in', investorHtml);
    const record: NotificationRecord = {
      id: uuidv4(),
      dealId: data.dealId,
      sponsorId: data.sponsorId,
      investorId: inv,
      sentAt: new Date(),
    };
    await audit(pg, record);
    nc.publish('NOTIFICATION_SENT', jc.encode(record));
  }
}

export default async function main() {
  const s3 = new S3();
  const nc: NatsConnection = await connect({ servers: process.env.NATS_URL });
  const ses = new SES({ region: process.env.AWS_REGION });
  const pg = new Client({ connectionString: process.env.DATABASE_URL });
  await pg.connect();

  const sub = nc.subscribe('DEAL_MATCHED');
  for await (const m of sub) {
    const data = jc.decode(m.data) as DealMatchedEvent;
    await processEvent(data, { s3, ses, pg, nc });
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
