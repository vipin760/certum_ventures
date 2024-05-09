const express = require('express')
const { doctorRegister, doctorLogin, doctorLogout } = require('../controller/doctor.controller')
const router = express()

router.route('/register').post(doctorRegister)

router.route('/login').post(doctorLogin)

router.route('/logout').get(doctorLogout);



module.exports =router