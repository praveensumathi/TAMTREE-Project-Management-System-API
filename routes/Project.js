const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

const use = (fn) =>(req,res,next) =>
Promise.resolve(fn(req,res,next)).catch(next);


router.post('/createproject',use (projectController.createProject));


router.get('/getallprojects',use (projectController.getAllProjects));


router.get('/getproject/:projectId',use(projectController.getProjectById));


router.put('/updateproject/:projectId',use(projectController.updateProject));


router.delete('/deleteproject/:projectId',use(projectController.deleteProject));

module.exports = router;