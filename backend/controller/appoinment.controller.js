const catchAsyncHandler = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const Doctor = require('../model/doctor.model');
const Appointment = require('../model/appointments.model');

exports.createAppointment=catchAsyncHandler( async(req,res,next)=>{
    const { date,start_time,end_time } = req.body

    const existingAppointment = await Appointment.findOne({
        doctor_id: req.doctor_id,date: date,$or:[
            { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
            { start_time: { $gte: start_time, $lt: end_time } },
            { end_time: { $gt: start_time, $lte: end_time } }
        ]
    })
    if(existingAppointment){
        return next(new ErrorHandler("already existing this appointment",401))
    }

    const doctorData = await Doctor.findById(req.doctor_id);
    req.body.doctor_id= req.doctor_id
    await Appointment.create(req.body).then(async(data)=>{
        const appData = { appointment_id:data._id }
        doctorData.appointments.push(appData)
        console.log(doctorData)
        await doctorData.save()
    }).then((save)=>{
        res.status(200).send({data:save,message:"appointments created succesfully"})
    })

})