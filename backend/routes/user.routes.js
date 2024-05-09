const express = require('express')
const { userRegister, userLogin, userLogout } = require('../controller/user.controller')
const router = express()

router.route('/register').post(userRegister);

router.route('/login').post(userLogin);

router.route('/logout').get(userLogout);

module.exports = router