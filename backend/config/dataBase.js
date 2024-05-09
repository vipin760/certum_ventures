const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log("db connected",data.connection.host)
    }).catch((error)=>{
        console.log(error.message);
    })
}

module.exports = connectDB;