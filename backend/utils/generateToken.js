const jwt = require('jsonwebtoken');
const generateToken =(user)=>{
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.TOKEN_EXPIRE*12*60*60*1000})
   }

   module.exports = generateToken;