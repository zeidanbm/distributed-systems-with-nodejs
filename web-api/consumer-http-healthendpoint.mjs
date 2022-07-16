#!/usr/bin/env node

import Fastify from 'fastify'
import fetch from 'node-fetch'
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000
const TARGET = process.env.TARGET || 'localhost:4000'

const server = Fastify({
    logger: true,
})

server.get('/', async () => {
    const req = await fetch(`http://${TARGET}/recipes/42`)
    const producer_data = await req.json()

    // reply.type('application/json').code(200)
    return {
        consumer_pid: process.pid,
        producer_data,
    }
})

server.get('/health', async () => {
    console.log('health check')
    return 'OK'
})

server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) throw err
    console.log(`Consumer running at ${address}`)
})
