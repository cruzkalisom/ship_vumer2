const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('base/admin')
})

module.exports = router