const mongoose = require("mongoose");
const TaskModel = require("../database/models/TaskSchema");

exports.createTask = async (req, res, next) => {
  try {
    const task = await TaskModel.create({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      status: req.body.status,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
  const task = await TaskModel.create({
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    status: req.body.status,
  });
  res.json(task);
};

exports.getTasks = async (req, res, next) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
};

exports.updateTask = async (req, res, next) => {
  const taskId = req.params.id;
  const task = await ProjectModel.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });
  res.json(task);
};

exports.deleteTask = async (req, res, next) => {
  const task = await TaskModel.deleteOne({
    _id: req.params.id,
  });
  res.json(task);
};
