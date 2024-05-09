const express = require('express');
const { createAppointment } = require('../controller/appoinment.controller');
const { authorization } = require('../middleware/authorization');
const router = express()

router.route('/create').post(authorization,createAppointment);


module.exports = router