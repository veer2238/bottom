import mongoose from "mongoose";

const passportSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    idType: {
      type: String,
      required: true,
      enum: ['aadhar', 'pan', 'passport', 'voter','driving','visitor-visa','oci','light-bill','students','other','gst','new-aadhar'],
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
    },

    restore:{
      type:Boolean,
      default:false
    },

    today:{
      type:Boolean,
      default:false
    },

    rejected:{
      type:Boolean,
      default:false
    },

    notimp:{
      type:Boolean,
      default:false
    }

  });

  const Passport = mongoose.model('passport', passportSchema);

  export default Passport
