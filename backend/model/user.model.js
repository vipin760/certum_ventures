const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 charactors"],
    minLength: [4, "please enter atleast 4 charactors"],
  },
  email:{
    type:String,
    required:[true,"Please Enter Your Email"],
    unique:true,
    validate:[validator.isEmail,"Please Enter a Valid Email"]
  },
  password:{
    type:String,
    required:[true,"Please Enter Your Password"],
    select:false
  },
  role:{
    type:String,
    default:'user'
}
});

const User = mongoose.model("User",userSchema)
module.exports = User
