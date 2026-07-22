const router = require('express').Router()
const uploads = require('../../modules/uploads')
const db = require('../../modules/db')
const encodes = require('../../modules/encodes')
const moment = require('moment')

router.post('/', uploads.any(), (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const sql2 = 'INSERT INTO user_sessions (user_id, remember, last_login) VALUES (?, ?, ?)'

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            console.error('Erro ao tentar buscar usuário vinculado ao e-mail no Banco de Dados')
            console.error(err.message)
            return res.json({errDb: true})
        }

        if(!result[0]){
            return res.json({emailNotRegistered: true})
        }

        const password = result[0].password
        const user_id = result[0].user_id

        encodes.bcrypt.compare(req.body.password, password, (err, success) => {
            if(err){
                console.error('Erro ao tentar comparar senha criptografada com a senha digitada pelo cliente')
                console.error(err.message)
            }

            if(!success){
                return res.json({invalidPassword: true})
            }

            var remember = 0

            if(req.body.remember == 'true'){
                remember = 1
            }

            const database = [
                user_id,
                remember,
                moment().format('YYYY-MM-DD HH:MM:ss')
            ]

            db.query(sql2, database, (err, result) => {
                if(err){
                    console.error('Erro ao tentar criar sessão do usuário no Banco de Dados')
                    console.error(err.message)
                    return res.json({errDb: true})
                }

                req.session.token = result.insertId
                req.session.user_id = user_id

                if(!req.session.oldPage || req.session.oldPage == undefined){
                    req.session.oldPage = '/admin'
                }

                return res.json({
                    status: true,
                    oldPage: req.session.oldPage
                })
            })
        })
    })
})

router.get('/', (req, res) => {
    res.render('gen/login')
})

module.exports = router