# fgcasolutions.github.io

 codex/implement-extra-stack-reliability-practices
This repository hosts a simple landing page for Financely. The site contains a single hero section with a call-to-action link and a disclaimer footer. Additional pages outline financing services and technology guidance.

This repository hosts a simple landing page for Financely. The site contains a single hero section with a call-to-action link and a disclaimer footer.

 codex/generate-monorepo-for-financely-ui-and-backend
## Monorepo

The `financely` directory contains a minimal scaffold for a production-ready platform including a React web app, GraphQL API, Go worker, notification service and infrastructure templates.

codex/revamp-financely-blueprint-for-live-ticker
## Live Ticker Blueprint (Prototype)

The `ticker-demo` folder contains stubs that outline how Financely could expose
live GraphQL subscriptions backed by NATS JetStream and update investor
Dashboards in real time via a WebSocket gateway. This prototype shows how deal
updates could be streamed to a React client using React Query with a WebSocket
transport, Zustand state management and Storybook to demonstrate the UI
refreshing when a deal is matched.

These files are not production ready but illustrate the main pieces:

- `server/` – Apollo Server using a JetStream backed PubSub implementation.
- `websocket-gateway/` – simple WebSocket proxy for GraphQL subscription events.
- `notification-service/` – emits an RxJS signal when `DEAL_MATCHED` occurs.
- `client/hooks/` – React hook (`useLiveDeal`) that subscribes to updates.
- `client/stories/` – Storybook story showing the dashboard flicking to green.
 codex/create-notification-service-package
## Notification Service

The `notification-service` directory contains a TypeScript micro-service that listens for `DEAL_MATCHED` events on NATS, generates a PDF summary, stores it in S3 for 90 days, emails the parties via SES/SendGrid, records an audit row in Postgres and republishes a `NOTIFICATION_SENT` event. Tests run with Jest and a GitHub Actions workflow lints and exercises the service.

## Financely Monorepo

The `financely/` directory contains a sample implementation of Financely's platform with multiple services, front-end, design system, and infrastructure manifests. Each service is typed with TypeScript or Go and includes TODO comments for business logic.
 main
 main
main
 main
