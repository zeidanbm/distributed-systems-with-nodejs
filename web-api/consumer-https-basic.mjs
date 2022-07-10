#!/usr/bin/env node

import Fastify from 'fastify'
import fetch from 'node-fetch';
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import https from 'https'
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'localhost:4000';

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = Fastify({
    logger: true
})

const options = {
    agent: new https.Agent({
        ca: readFileSync(__dirname+'/../shared/tls/basic-certificate.cert')
    })
}

server.get('/', async () => {
    const req = await fetch(`http://${TARGET}/recipes/42`, options);
    const producer_data = await req.json();

    // reply.type('application/json').code(200)
    return {
        consumer_pid: process.pid,
        producer_data
    }
})

server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) throw err
    console.log(`Consumer running at ${address}`);
})