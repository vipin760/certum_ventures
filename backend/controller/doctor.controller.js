const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const Doctor = require('../model/doctor.model');
const generateToken = require('../utils/generateToken');

exports.doctorRegister = catchAsyncErrors( async(req,res,next)=>{
    const doctorData = await Doctor.findOne({email:req.body.email})
    if(doctorData){
        return next(new ErrorHandler("email already exist",401))
    }
    const passwordHash = await bcrypt.hash(req.body.password,parseInt(process.env.SALT));
     req.body.password = passwordHash

    await Doctor.create(req.body).then(data=>{
        res.status(200).send({message:`Doctor registration completed succesfully`})
    })
})

exports.doctorLogin = catchAsyncErrors( async(req,res,next)=>{
    const doctorData = await Doctor.findOne({email:req.body.email})
    if(!doctorData){
        return next(new ErrorHandler("email or password incorrect",403))
    }
    const passwordMatch = bcrypt.compare(req.body.password,doctorData.password);
    if(!passwordMatch){
        return next(new ErrorHandler("email or password incorrect",403)) 
    }
    const token = generateToken(doctorData)
    sendToken(token,res)
})

exports.doctorLogout=catchAsyncErrors( async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).send({message:"logout success"})
})