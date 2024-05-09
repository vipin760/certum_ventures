const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')
const Doctor = require('../model/doctor.model')
const User = require('../model/user.model')

exports.authorization=catchAsyncErrors( async(req,res,next)=>{
    const { token } = req.cookies
    if(!token){
        return next( new ErrorHandler("please login first",401));
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    if(decode.id){
        req.doctor_id = decode.id
        next()
    }

})

exports.authorizationRoles=(...roles)=>catchAsyncErrors( async(req,res,next)=>{
    console.log(req.doctor_id)
            let doctorData = await Doctor.findById(req.doctor_id);
            if(!doctorData){
                doctorData = await User.findById(req.doctor_id);
            }
            console.log(doctorData)
            if(!roles.includes(doctorData.role)){
                return next(new ErrorHandler(`route cannot access ${doctorData.role} please contact admin`));
            }
            next()
})
