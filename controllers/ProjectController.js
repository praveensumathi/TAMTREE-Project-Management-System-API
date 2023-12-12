const ProjectModel = require("../database/models/project");
const mongoose = require("mongoose");

exports.createProject = async (req, res, next) => {
  try {
    const { projectName, description, startDate, endDate, duration } = req.body;
    const project = await ProjectModel.create({
      projectName,
      description,
      startDate,
      endDate,
      duration,
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

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
          from: "stories",
          localField: "_id",
          foreignField: "project",
          as: "projectStories",
        },
      },
      {
        $unwind: { path: "$projectStories", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "projectStories._id",
          foreignField: "story",
          as: "storyTasks",
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "storyTasks.assignedTo",
          foreignField: "_id",
          as: "assignedUser",
        },
      },
      {
        $unwind: { path: "$assignedUser", preserveNullAndEmptyArrays: true },
      },

      {
        $group: {
          _id: "$_id",
          projectName: { $first: "$projectName" },
          description: { $first: "$description" },
          duration: { $first: "$duration" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          stories: {
            $push: {
              title: "$projectStories.title",
              description: "$projectStories.description",
              tasks: {
                $map: {
                  input: "$storyTasks",
                  as: "task",
                  in: {
                    title: "$$task.title",
                    description: "$$task.description",
                    assignedTo: {
                      _id: "$assignedUser._id",
                      name: {
                        $concat: [
                          "$assignedUser.firstName",
                          " ",
                          "$assignedUser.lastName",
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          projectName: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          duration: 1,
          stories: 1,
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
    const { projectName, description, startDate, endDate, duration } = req.body;

    const project = await ProjectModel.findByIdAndUpdate(
      req.params.projectId,
      {
        projectName,
        description,
        startDate,
        endDate,
        duration,
      },
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
