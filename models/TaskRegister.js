import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },

  assigndate:{
  type:Date,
  required: true,
    
  },

  completiondate:{
    type:Date,
    required: true,
  },

description:{
    type:String,
    required: true,
}



});

const TaskRegister = mongoose.model('taskregister', taskSchema);

export default TaskRegister
