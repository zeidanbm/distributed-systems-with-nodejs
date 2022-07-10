#!/usr/bin/env node
const fs = require('fs');
const server = require('fastify')({
    https: {
        key: fs.readFileSync(__dirname + '/tls/basic-private-key.key'),
        cert: fs.readFileSync(__dirname + '/../shared/tls/basic-certificate.cert')
    },
    logger: true
});
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

console.log(`worker pid=${process.pid}`);

server.get('/recipes/:id', async (req, reply) => {
    console.log(`worker request pid=${process.pid}`);
    const id = Number(req.params.id);
    if(id != 42) {
        reply.type('application/json').code(404);
        return { error: 'not_found' }
    }
    reply.type('application/json').code(200)
    return {
        producer_pid: process.pid,
        recipe: {
            id, name: 'Chicken Tikka Masala',
            steps: 'Throw it in a pot...',
            ingredients: [
                { id: 1, name: 'Chicken', quantity: '1 lb'},
                { id: 2, name: 'Sauce', quantity: '2 cups'}
            ]
        }
    }
})


server.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) throw err
    console.log(`Producer running at ${address}`);
})