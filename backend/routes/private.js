const router = require('express').Router()
const {private} = require('../controllers/private')
const {protect} = require('./../controllers/auth')

router.route('/').get(protect,private)
module.exports = router