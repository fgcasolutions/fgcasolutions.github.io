import { createTransport } from 'nodemailer';
import { S3 } from 'aws-sdk';
import { connect } from 'nats';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { initTelemetry } from '../../packages/common/telemetry';

export async function handleDealMatched(event: any) {
  initTelemetry();
  const templateSrc = fs.readFileSync(path.join(__dirname, 'templates', 'deal.hbs'), 'utf8');
  const template = Handlebars.compile(templateSrc);
  const html = template(event);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  const s3 = new S3();
  const key = `notifications/${Date.now()}.pdf`;
  await s3.putObject({ Bucket: 'financely-notifications', Key: key, Body: pdf, Expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }).promise();

  const transport = createTransport({ sendmail: true }); // TODO SES/SendGrid config
  await transport.sendMail({
    from: 'no-reply@financely.com',
    to: event.recipients.join(','),
    subject: 'Deal Matched',
    text: 'See attached PDF',
    attachments: [{ filename: 'deal.pdf', content: pdf }],
  });

  const nc = await connect({ servers: 'nats://localhost:4222' });
  nc.publish('NOTIFICATION_SENT', JSON.stringify({ key }));
  await nc.drain();
}
