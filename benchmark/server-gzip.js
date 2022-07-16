const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 4000

http.createServer((req, res) => {
    const raw = fs.createReadStream(__dirname + '/index.html')
    const acceptEncoding = req.headers['accept-encoding'] || ''
    res.setHeader('Content-Type', 'text/plain')
    console.log(acceptEncoding)

    if (acceptEncoding.includes('gzip')) {
        console.log('encoding with gzip')
        res.setHeader('Content-Encoding', 'gzip')
        raw.pipe(zlib.createGzip()).pipe(res)
    } else {
        console.log('no encoding')
        raw.pipe(res)
    }
}).listen(PORT, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`)
})
