const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

const use = (fn) =>(req,res,next) =>
Promise.resolve(fn(req,res,next)).catch(next);


router.post('/createstory', storyController.createStory);


router.get('/getstories', storyController.getStories)

router.get('/getallstories', storyController.getAllStories);

router.get('/getstory/:storyId', storyController.getStoryById);

router.put('/updatestory/:storyId', storyController.updateStory);

router.delete('/deletestory/:storyId', storyController.deleteStory);

module.exports = router;
