#!/usr/bin/env node

const server = require('fastify')({
    logger: true
});
const mercurius = require('mercurius');
const fs = require('fs');
const schema = fs.readFileSync(__dirname + '/../shared/graphql-schema.gql').toString();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

const resolvers = {
    Query: {
        pid: () => process.pid,
        recipe: async(_obj, {id}) => {
            if(id != 42) throw new Error(`recipe ${id} not found`);
            return {
                id, name: "Chicken Tikka Masala",
                steps: "Throw it in a pot..."
            }
        }
    },
    Recipe: {
        ingredients: async (obj) => {
            return (obj.id != 42) ? [] : [
                { id: 1, name: 'Chicken', quantity: '1 lb'},
                { id: 2, name: 'Sauce', quantity: '2 cups'}
            ]
        }
    }
};

server.register(mercurius, { schema, resolvers, graphiql: true })
.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) throw err
    console.log(`Producer running at ${address}`);
})