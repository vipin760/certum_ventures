const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())

/////routes
const user_route = require('./routes/user.routes');
const doctor_route=require('./routes/doctor.route');
const appointment_route=require('./routes/appointment.route')
app.use('/api/user',user_route);
app.use('/api/doctor',doctor_route);
app.use('/api/appointment',appointment_route)


///////error middleware
app.use(errorMiddleware);

module.exports = app






