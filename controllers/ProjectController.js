const ProjectModel = require("../database/models/project");
const mongoose = require("mongoose");

// POST create a new project
exports.createProject = async (req, res, next) => {
  try {
    const project = await ProjectModel.create({
      ProjectName: req.body.ProjectName,
      description: req.body.description,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      Duration: req.body.Duration,
      Budget:req.body.Budget
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// GET all projects find 
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// GET a specific project by ID aggregate
exports.getProjectById = async (req, res) => {
  try {
    const result = await ProjectModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.projectId) },
      },
      {
        $lookup: {
          from: "storymodels",
          localField: "_id",
          foreignField: "project",
          as: "stories",
        },
      },
      {
        $unwind: { path: "$stories", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "taskmodels",
          localField: "stories._id",
          foreignField: "story",
          as: "stories.tasks",
        },
      },
      { $unwind: { path: "$stories.tasks", preserveNullAndEmptyArrays: true } },
     
      
      {
        $group: {
          _id: "$_id",
          ProjectName: { $first: "$ProjectName" },
          description: { $first: "$description" },
          Duration: { $first: "$Duration" },
          startDate:{ $first: "$startDate" },
          endDate:{ $first: "$endDate" },
          Budget:{$first: "$Budget"},
          stories: { $push: {
            title:"$stories.title",
            description:"$stories.description",
            tasks:{
              title:"$stories.tasks.title",
              description:"$stories.tasks.description",

            }
          } },
        },
      },
      {
        $project: {
          _id: 1,
          ProjectName: 1,
          description: 1,
          startDate:1,
          endDate:1,
          Duration: 1,
          Budget: 1,
          stories: 1
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(
      req.params.projectId,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
