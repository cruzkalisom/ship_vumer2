const router = require('express').Router()
const uploads = require('../../modules/uploads')
const db = require('../../modules/db')
const encodes = require('../../modules/encodes')
const moment = require('moment')

router.post('/', uploads.any(), (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    const sql2 = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    const sql3 = 'INSERT INTO user_sessions (user_id, last_login) VALUES (?, ?)'

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            console.error('Erro ao tentar buscar usuário vinculado ao e-mail no Banco de Dados')
            console.error(err.message)
            return res.json({errDb: true})
        }

        if(result[0]){
            return res.json({emailRegistered: true})
        }

        const passEncoded = encodes.encodePassword(req.body.password)

        const database = [
            req.body.name || 'Sem nome',
            req.body.email || 'sem@email',
            passEncoded || 'semsenha'
        ]

        db.query(sql2, database, (err, result) => {
            if(err){
                console.error('Erro ao tentar criar usuário no Banco de Dados')
                console.error(err.message)
                return res.json({errDb: true})
            }

            const user_id = result.insertId

            const database = [
                user_id,
                moment().format('YYYY-MM-DD HH:MM:ss')
            ]

            db.query(sql3, database, (err, result) => {
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

                res.json({status: true, oldPage: req.session.oldPage})
            })
        })
    })
})

router.get('/', (req, res) => {
    res.render('gen/register')
})

module.exports = router