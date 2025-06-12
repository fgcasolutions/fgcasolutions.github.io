# fgcasolutions.github.io

This repository hosts a simple landing page for Financely. The site contains a single hero section with a call-to-action link and a disclaimer footer.

## Notification Service

The `notification-service` directory contains a TypeScript micro-service that listens for `DEAL_MATCHED` events on NATS, generates a PDF summary, stores it in S3 for 90 days, emails the parties via SES/SendGrid, records an audit row in Postgres and republishes a `NOTIFICATION_SENT` event. Tests run with Jest and a GitHub Actions workflow lints and exercises the service.
