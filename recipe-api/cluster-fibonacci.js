#!/usr/bin/env node

const server = require('fastify')({
    logger: true,
})
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 4000

console.log(`worker pid=${process.pid}`)

server.get('/:limit', async (req, reply) => {
    await sleep(10)
    return String(fibonacci(Number(req.params.limit)))
})

server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) throw err
    console.log(`Producer running at ${address}`)
})

function fibonacci(limit) {
    let prev = 1n,
        next = 0n,
        swap

    while (limit) {
        swap = prev
        prev = prev + next
        next = swap
        limit--
    }
    return next
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
