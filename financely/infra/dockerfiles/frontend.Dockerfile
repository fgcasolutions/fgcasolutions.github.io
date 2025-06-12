FROM node:20-alpine
WORKDIR /app
COPY ../../packages/frontend .
RUN npm install && npm run build
CMD ["npm", "run", "dev"]
