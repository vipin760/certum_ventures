const mongoose = require("mongoose");
const validator = require('validator')

const doctorSchema = mongoose.Schema({
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
  appointments:[
    {appointment_id:{type:mongoose.Schema.ObjectId,ref:'Appointment'}}
  ],
  role:{
    type:String,
    default:'doctor'
}
});

const Doctor = mongoose.model("Doctor",doctorSchema)
module.exports = Doctor
