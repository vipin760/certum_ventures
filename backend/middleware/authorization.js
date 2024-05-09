const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')

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