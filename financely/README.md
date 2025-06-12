# Financely Monorepo

This monorepo contains the core applications and services for the **Financely** platform. It demonstrates a React front‑end, a GraphQL gateway with Node microservices, a Go service for deal matching, and sample infrastructure for Postgres, ElasticSearch, ClickHouse, and NATS.

Each package is written in TypeScript or Go with placeholder business logic. TODO comments highlight where real implementations are required.

```
financely/
  packages/
    frontend/          – Vite + React + TypeScript app
    design-system/     – Storybook and Tailwind components
    gateway/           – Apollo GraphQL gateway
    business-service/  – Node microservice for business rules
    deal-matcher/      – Go service for high‑throughput matching
  infra/               – Dockerfiles and Kubernetes manifests
  sample-events/       – Example NATS event payloads
```

Run `npm install` at the repository root to install all workspace dependencies.
