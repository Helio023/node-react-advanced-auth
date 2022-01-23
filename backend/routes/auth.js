const router = require('express').Router()
const  {register, login, forgetPassword, resetPassword} = require('../controllers/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword/:token').post(resetPassword)

module.exports = router