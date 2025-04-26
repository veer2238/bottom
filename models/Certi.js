
import mongoose from "mongoose";

const certiSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    certiId: {
      type: String,
      required: true,
    },
  });

const Certi = mongoose.model('Certificate', certiSchema);

export default Certi
