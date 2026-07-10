const router = require('express').Router()

router.post('/battery', (req, res) => {
    console.log(req.body)
})

module.exports = router