const router = require('express').Router()c
const {private} = require('../controllers/private')

router.route('/').get(private)
module.exports = router