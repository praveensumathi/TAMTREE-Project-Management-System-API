const mongoose = require("mongoose");

const StoryModel = require("./story");

const taskStatusEnum = ["To do", "In Progress", "Completed"]

const TaskSchema = new mongoose.Schema({
    story: { type: mongoose.Schema.Types.ObjectId, ref: StoryModel },
  title: String,
  description: String,
  status: { 
    type: String,
    enum: taskStatusEnum,
    default: "To do" 
  },
  
});

const TaskModel = mongoose.model("TaskModel", TaskSchema);

module.exports = TaskModel;
