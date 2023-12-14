const mongoose = require("mongoose");
const TaskModel = require("../database/models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const task = await TaskModel.create({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      status: req.body.status,
      story: req.body.story,
      assignedTo: req.body.assignedTo,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
};

exports.updateTask = async (req, res, next) => {
  const taskId = req.params.id;
  const { title, description, duration, status, story, assignedTo } = req.body;
  const updatedTask = {
    title,
    description,
    duration,
    status,
    story,
    assignedTo,
  };
  const task = await TaskModel.findByIdAndUpdate(taskId, updatedTask, {
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

exports.updateTaskStatus = async (req, res, next) => {
  const taskId = req.params.id;
  const { status } = req.body;
  const updatedTask = {
    status,
  };
  const task = await TaskModel.findByIdAndUpdate(taskId, updatedTask, {
    new: true,
  });
  res.json(task);
};
