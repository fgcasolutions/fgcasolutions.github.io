FROM golang:1.20-alpine AS build
WORKDIR /app
COPY . .
RUN go build -o matcher

FROM alpine
COPY --from=build /app/matcher /usr/local/bin/matcher
CMD ["/usr/local/bin/matcher"]
