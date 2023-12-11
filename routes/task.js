const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


const use = (fn) =>(req,res,next) =>
Promise.resolve(fn(req,res,next)).catch(next);


router.post('/createtask', taskController.createTask);


router.get('/gettasks', taskController.getTasks);



router.get('/getalltasks', taskController.getAllTasks);


router.get('/gettask/:taskId', taskController.getTaskById);


router.put('/updatetask/:taskId', taskController.updateTask);

router.delete('/deletetask/:taskId', taskController.deleteTask);

module.exports = router;
