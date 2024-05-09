const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const Doctor = require('../model/doctor.model');
const Appointment = require('../model/appointments.model');

exports.createAppointment=catchAsyncErrors( async(req,res,next)=>{
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
        await doctorData.save()
    }).then((save)=>{
        res.status(200).send({data:save,message:"appointments created succesfully"})
    })

})

// exports.getAllDoctorsWithAppointment=catchAsyncErrors( async (req,res,next)=>{
//     const populatedData = await doctorData.find().populate('appointments').exec();
        
//     res.status(200).send({data:populatedData})
// })

exports.getAllDoctorsWithAppointment=catchAsyncErrors( async (req,res,next)=>{
    const doctorData = await Doctor.find()
    if(doctorData.length===0){
        return next( new ErrorHandler("not found doctors"));
    }
    // all doctors with appointment filtered here....
    const appointmentData = await Doctor.aggregate([{$lookup:{from:'appointments',localField:"appointments.appointment_id",foreignField:"_id",as:"newField"}}])
    const appointmentSheduleDoctors = appointmentData.filter(data=> data.appointments.length !== 0);
    res.status(200).send({data:appointmentSheduleDoctors}) 
}) 

exports.allAppointments=catchAsyncErrors( async(req,res,next)=>{
    const appointmentData = await Appointment.find()
    if(!appointmentData){
        return next(new ErrorHandler("not scheduled appointment",404));
    }
    res.status(200).send({data:appointmentData,message:"appointments get success"})
})