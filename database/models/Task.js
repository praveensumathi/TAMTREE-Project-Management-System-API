const mongoose = require("mongoose");
const StoryModel = require("../models/story");
const EmployeeModel = require("../models/Employee");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  status: String,
  story: {
    type: mongoose.Types.ObjectId,
    ref: StoryModel,
  },
  assignedTo: {
    type: mongoose.Types.ObjectId,
    ref: EmployeeModel,
  },
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;
