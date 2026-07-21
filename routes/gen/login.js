const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('gen/login')
})

module.exports = router