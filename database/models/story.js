const mongoose = require('mongoose');
const ProjectModel = require('./Project')



const StorySchema = new mongoose.Schema({
   title: String,
  description: String,
  project:{ type: mongoose.Schema.Types.ObjectId, ref: ProjectModel}  
});

const StoryModel = mongoose.model('Story', StorySchema);

module.exports = StoryModel;