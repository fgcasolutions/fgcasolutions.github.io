FROM golang:1.21-alpine
WORKDIR /app
COPY ../../packages/deal-matcher .
RUN go build -o deal-matcher
CMD ["./deal-matcher"]
