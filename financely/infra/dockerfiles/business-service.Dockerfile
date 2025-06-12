FROM node:20-alpine
WORKDIR /app
COPY ../../packages/business-service .
RUN npm install && npm run build
CMD ["node", "dist/index.js"]
