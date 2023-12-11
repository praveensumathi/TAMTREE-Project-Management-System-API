const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  ProjectName: String,
  description: String,
  startDate: Date,
  endDate: Date,
  Duration:String,
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel 