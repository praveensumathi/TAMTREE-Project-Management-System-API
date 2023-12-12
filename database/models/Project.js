const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  startDate: Date,
  endDate: Date,
  duration:String,
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel 