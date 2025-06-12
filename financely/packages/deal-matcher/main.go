package main

import (
    "log"
    nats "github.com/nats-io/nats.go"
)

func main() {
    // TODO: implement high-throughput matching logic
    nc, err := nats.Connect(nats.DefaultURL)
    if err != nil {
        log.Fatal(err)
    }
    defer nc.Drain()

    log.Println("Deal matcher service running")
    select {}
}
