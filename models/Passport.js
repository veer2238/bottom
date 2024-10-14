import mongoose from "mongoose";

const passportSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    idType: {
      type: String,
      required: true,
      enum: ['aadhar', 'pan', 'passport', 'voter','driving','students','other'],
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    important:{
      type:Boolean,
      default:false
    },
    normal:{
      type:Boolean,
      default:false
    },
    status:{
      type:Boolean,
      default:false
    }

  });

  const Passport = mongoose.model('passport', passportSchema);

  export default Passport
