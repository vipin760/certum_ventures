const sendToken = (token,res)=>{
    const options ={
        expire:new Date(Date.now()+process.env.TOKEN_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
    res.status(200).cookie('token',token,options).send({status:true,data:token,message:"Success"})
}

module.exports = sendToken;