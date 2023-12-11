const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  ProjectName: String,
  description: String,
  startDate: Date,
  endDate: Date,
  Duration:String,
  Budget: Number,
});

const ProjectModel = mongoose.model('ProjectModel', ProjectSchema);

module.exports = ProjectModel 