const express = require('express');
const { createAppointment, getAllDoctorsWithAppointment, allAppointments } = require('../controller/appoinment.controller');
const { authorization, authorizationRoles } = require('../middleware/authorization');
const router = express()

router.route('/create').post(authorization,authorizationRoles("doctor"),authorization,createAppointment);

router.route('/get').get(authorization,getAllDoctorsWithAppointment);

router.route('/').get(authorization,authorizationRoles("doctor"),allAppointments)

module.exports = router