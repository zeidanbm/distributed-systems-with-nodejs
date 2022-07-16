const http = require('http')
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 4000

http.createServer((req, res) => {
    res.end('ok')
}).listen(PORT, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`)
})
