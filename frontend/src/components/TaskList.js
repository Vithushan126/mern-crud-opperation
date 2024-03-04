import axios from "axios";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import loadingImg from "../assets/loader.gif";
import { notification } from "antd";
import Task from "./Task";

// http://localhost:5000/api/tasks

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks");
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      notification.error({
        message: error.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return notification.error({
        message: "Input field cannot be empty",
      });
    }
    try {
      await axios.post("http://localhost:5000/api/tasks", formData);
      notification.success({ message: "Task added successfully" });
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      notification.error({
        message: error.message,
      });
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      notification.error(error.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.compleate === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return notification.error("Input field cannot be empty.");
    }
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      notification.error(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      compleate: true,
    };
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        newFormData
      );
      getTasks();
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}

      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
