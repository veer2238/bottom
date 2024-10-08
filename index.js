import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Contactroute from './routes/Contact.js';
import Attendancetroute from './routes/Attendance.js'
import Certiroute from './routes/Certi.js'
import Payroute from './routes/Payment.js'
import Passportroute from './routes/Passport.js'
import Fileroute from './routes/File.js'
import Birthroute from './routes/Birthday.js'
import Task from './routes/TaskRegister.js'
 



const app = express();
app.use(express.json());

app.use(cors());

app.use('/',Contactroute)
app.use('/',Attendancetroute)
app.use('/',Certiroute)
app.use('/',Payroute)
app.use('/',Passportroute)
app.use('/',Task)
app.use('/',Fileroute)
app.use('/',Birthroute)




mongoose
  .connect(
    "mongodb+srv://veer2238rajput:STrgrNlEXyfMZHBs@cluster0.3chkue4.mongodb.net/Contact?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));









app.listen(9000, () => {
  console.log('Server is connected');
});
