const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Página inicial do projeto de Nave espacial Vumer')
})

module.exports = router