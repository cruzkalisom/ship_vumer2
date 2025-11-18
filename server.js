const express = require('express')
const http = require('http')
const config = require('./misc/config.json')

const port = config.server.port

const app = express()
const server = http.createServer(app)

server.listen(port, () => {
    console.log('Servidor online na porta ' + port)
})