const express = require("express");
const Task = require("../modals/taskModel");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();
// router.route("/").get(getTask).post(createTask);
// router.route("/:id").get(getTask).delete(deleteTask).put(updateTask).patch(updateTask) //route use like that also

//Create a Task
router.post("/", createTask);

//Get all Task
router.get("/", getTasks);

//Get one Task
router.get("/:id", getTask);

//Delete Task
router.delete("/:id", deleteTask);

//Update  Task
router.put("/:id", updateTask);

//Update  Task
router.patch("/:id", updateTask);

module.exports = router;
