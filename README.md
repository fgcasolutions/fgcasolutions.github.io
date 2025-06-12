# fgcasolutions.github.io

This repository hosts a simple landing page for Financely. The site contains a single hero section with a call-to-action link and a disclaimer footer.

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
