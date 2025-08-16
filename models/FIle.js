
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: String,
     mobile: Number,
     dob: Date,
     email: String,
     permanentadd: String,
     presentadd: String,
     pincode: String,
     institutename:String,
     education:String,
     currentstatus:String,
     techopted:String,
     duration:String,
     fees:Number,
     pendingfees:Number,
     referedby:String,
     photo:String,
     aadhar:String,

       
     approved: { type: Boolean, default: false },
     createdAt: { type: Date, default: Date.now }
   });

 const File = mongoose.model('File', fileSchema);

 export default File
