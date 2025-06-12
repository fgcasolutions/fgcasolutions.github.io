# fgcasolutions.github.io

 codex/implement-extra-stack-reliability-practices
This repository hosts a simple landing page for Financely. The site contains a single hero section with a call-to-action link and a disclaimer footer. Additional pages outline financing services and technology guidance.

This repository hosts a simple landing page for Financely. The site contains a single hero section with a call-to-action link and a disclaimer footer.

 codex/create-notification-service-package
## Notification Service

The `notification-service` directory contains a TypeScript micro-service that listens for `DEAL_MATCHED` events on NATS, generates a PDF summary, stores it in S3 for 90 days, emails the parties via SES/SendGrid, records an audit row in Postgres and republishes a `NOTIFICATION_SENT` event. Tests run with Jest and a GitHub Actions workflow lints and exercises the service.

## Financely Monorepo

The `financely/` directory contains a sample implementation of Financely's platform with multiple services, front-end, design system, and infrastructure manifests. Each service is typed with TypeScript or Go and includes TODO comments for business logic.
 main
 main
