const Task = require("../modals/taskModel");

//create a task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get all task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get one  task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findById(id);
    if (!tasks) {
      return res.status(404).json(`No task with id ${id}`);
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//delete  task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.findByIdAndDelete(id);
    if (!tasks) {
      return res.status(404).json(`No task with id ${id}`);
    }
    res.status(200).send(`Successfully delete task.`);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Update  task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json(`No task with id ${id}`);
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createTask, getTasks, getTask, deleteTask, updateTask };
