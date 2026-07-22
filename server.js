const express = require('express')
const http = require('http')
const config = require('./misc/config.json')
const BodyParser = require('body-parser')
const ejs = require('ejs')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const genRoutes = require('./routes/gen/gen')
const phoneInfoRoutes = require('./routes/Phone/getinfo')
const loginRoutes = require('./routes/gen/login')
const registerRoutes = require('./routes/gen/register')
const adminRoutes = require('./routes/base/admin')

const port = config.server.port

const sessionDbOptions = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
}

const sessionStore = new MySQLStore(sessionDbOptions)
const optionsSessionManager = session({
    secret: config.session.secret,
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
})

const app = express()
const server = http.createServer(app)

app.use(optionsSessionManager)

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())

app.use('/admin', adminRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/', genRoutes)
app.use('/phone', phoneInfoRoutes)

server.listen(port, () => {
    console.log('Servidor online na porta ' + port)
})