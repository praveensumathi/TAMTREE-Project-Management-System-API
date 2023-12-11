const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  status: String,
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;
