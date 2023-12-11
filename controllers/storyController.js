const StoryModel = require("../database/models/story")


// POST create a new story
exports.createStory = async (req, res,next) => {
    try {
        const story = await StoryModel.create({
            title:req.body.title,
            description:req.body.description,
            project:req.body.project,
        });
        res.json(story);
      } catch (error) {
        next(error);
      }
    }
    ;


  //get stories find
 exports.getStories = async (req, res,next) => { 
  try {
    const stories = await StoryModel.find()
    res.json(stories);
  } catch (err) {
    next(err);
  }
 } 


// GET all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await StoryModel.aggregate(
      [
        {
          $lookup:{
            from:"projectmodels",
            localField:"project",
            foreignField:"_id",
            as:"project"
          },
          
          
        },{$unwind:"$project"},{$project:
          {
            _id:1,
            title: 1,
  description: 1,
  project:{
    _id:1,
    ProjectName: 1,
    description: 1,
    Duration:1,
    startDate:1,
    endDate:1,
    Budget:1 
  }
          }
        }
      ]
    );
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await StoryModel.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// PUT update a story by ID
exports.updateStory = async (req, res) => {
  try {
    const story = await StoryModel.findByIdAndUpdate(
      req.params.storyId,
       req.body ,
      { new: true }
    );
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a story by ID
exports.deleteStory = async (req, res) => {
  try {
    const story = await StoryModel.findByIdAndDelete(req.params.storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
