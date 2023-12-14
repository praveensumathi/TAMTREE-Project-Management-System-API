const StoryModel = require("../database/models/story");


exports.createStory = async (req, res, next) => {
  try {
    const { title, description, project } = req.body;
    const story = await StoryModel.create({
      title,
      description,
      project,
    });
    res.json(story);
  } catch (error) {
    next(error);
  }
};

exports.getStories = async (req, res, next) => {
  try {
    const stories = await StoryModel.find();
    res.json(stories);
  } catch (err) {
    next(err);
  }
};

exports.getStorybasicinfo = async (req, res, next) => {
  try {
    const { projectId } = req.params; 

    const stories = await StoryModel.find({ project: projectId }, 'title description');

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: 'No stories found for the project' });
    }

    
    const storiesInfo = stories.map(story => ({ storyId: story._id, title: story.title,description: story.description }));

    res.json(storiesInfo); 
  } catch (error) {
    next(error);
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await StoryModel.aggregate([
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project",
        },
      },
      { $unwind: "$project" },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          project: {
            _id: 1,
            ProjectName: 1,
            description: 1,
            Duration: 1,
            startDate: 1,
            endDate: 1,
          },
        },
      },
    ]);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await StoryModel.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { title, description, project } = req.body;
    const story = await StoryModel.findByIdAndUpdate(
      req.params.storyId,
      {
        title,
        description,
        project,
      },
      { new: true }
    );
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const story = await StoryModel.findByIdAndDelete(req.params.storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
