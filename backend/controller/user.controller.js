const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../model/user.model');
const ErrorHandler = require('../utils/ErrorHandler');
const bcrypt = require('bcrypt');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');



exports.userRegister=catchAsyncErrors( async(req,res,next)=>{
    const userData = await User.findOne({email:req.body.email})
    if(userData){
        return next(new ErrorHandler("email already exist",401));
    }
    const passwordHash =await bcrypt.hash(req.body.password,parseInt(process.env.SALT))
    req.body.password = passwordHash
    await User.create(req.body).then(data=>{
        res.status(200).send({message:"register successfully..."})
    })
})

exports.userLogin=catchAsyncErrors( async(req,res,next)=>{
    const userData = await User.findOne({email:req.body.email})
    if(!userData){
        return next(new ErrorHandler("email or password incorrect",403))
    }
    const passwordMatch = bcrypt.compare(req.body.password,userData.password);
    if(!passwordMatch){
        return next(new ErrorHandler("email or password incorrect",403))
    }
    const token = generateToken(userData)
    if(token){
        sendToken(token,res);
    }
})

exports.userLogout=catchAsyncErrors( async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).send({message:"logout success"})
})