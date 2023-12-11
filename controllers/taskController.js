const TaskModel = require("../database/models/task");


exports.createTask = async (req, res) => {
  try {
    const task = await TaskModel.create({
      title: req.body.title,
      description: req.body.description,
      status:req.body.status,
      story: req.body.story,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find()
      .populate({ path: "story", select: "title" })
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.aggregate([
      {
        $lookup: {
          from: "storymodels",
          localField: "story",
          foreignField: "_id",
          as: "story",
        },
      },
      { $unwind: "$story" },
      {
        $lookup: {
          from: "projectmodels",
          localField: "story.project",
          foreignField: "_id",
          as: "story.project",
        },
      },

      {
        $project: {
          title: 1,
          description: 1,
          status:1,
          story:1
        },
      },
    ]);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
