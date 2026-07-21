const db = require('mysql4')
const config = require('../misc/config.json')

const connect = db.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

connect.getConnection((err) => {
    if(err){
        console.error('Erro ao contectar com o Banco de Dados')
        return console.error(err.message)
    }

    console.log('Conexão com o Banco de Dados bem sucedida')
})

module.exports = connect