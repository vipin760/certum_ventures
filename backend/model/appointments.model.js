const mongoose = require('mongoose');

const appointmentSchema =new mongoose.Schema({
    doctor_id:{type:mongoose.Schema.ObjectId,ref:'Doctor',required:true},
    date:{type:Date,required:true},
    start_time:{type:Date,required:true},
    end_time:{type:Date,required:true}
})

const Appointment = mongoose.model("Appointment",appointmentSchema)
module.exports = Appointment