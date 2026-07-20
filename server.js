const express = require('express')
const http = require('http')
const config = require('./misc/config.json')
const BodyParser = require('body-parser')
const ejs = require('ejs')

const genRoutes = require('./routes/gen/gen')
const phoneInfoRoutes = require('./routes/Phone/getinfo')

const port = config.server.port

const app = express()
const server = http.createServer(app)

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())

app.use('/', genRoutes)
app.use('/phone', phoneInfoRoutes)

server.listen(port, () => {
    console.log('Servidor online na porta ' + port)
})