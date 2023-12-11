const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/createTask", use(taskController.createTask));
router.get("/getTasks", use(taskController.getTasks));
router.delete("/deleteTask/:id", use(taskController.deleteTask));
router.put("/updateTask/:id", use(taskController.updateTask));
module.exports = router;
