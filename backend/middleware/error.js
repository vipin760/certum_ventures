const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server down"

     // wrong mongodb id error
     if(err.name==="CastError"){
        const message = `resource not found . invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400)
    }

    // jwt wrong
    if(err.name=== "jsonWebTokenError"){
        const message = 'Json web token is invalid, please try again'
        err = new ErrorHandler(message,400)
    }

    // jwt expire
    if(err.name === "TokenExpiredError"){
        const message = 'Json web token is expired, please try again'
        err = new ErrorHandler(message,400)
    }

    if(err.message.includes('E11000 duplicate key error')){
        let fieldName = 'unknown';
        const fieldMatch = err.message.match(/index: (.+?)_1/);
        if (fieldMatch) {
            fieldName = fieldMatch[1];
        }
        const valueMatch = err.message.match(/\"(.+?)\"/);
        const duplicateValue = valueMatch ? valueMatch[1] : 'unknown';
        const message = `Already exist in these ${fieldName} '${duplicateValue}' in our collection`;
        err = new ErrorHandler(message,400)

    }
    res.status(err.statuscode).send({status:false,data:'',message:err.message});
}