import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import TaskInput from "./TaskInput"; 
import TaskList from "./TaskList"; 
import TaskDetails from "./TaskDetails"; 

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}?_limit=20`);
        const data = await response.json();
        const formattedTasks = data.map((task) => ({
          ...task,
          description: "Sample Description and Good",
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
          status: "To Do",
        }));
        setTasks(formattedTasks);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);


  const addTask = async (title, description) => {
    const currentTime = new Date().toLocaleString();
    const newTask = {
      id: Date.now(),
      title,
      description,
      createdAt: currentTime,
      updatedAt: currentTime,
      status: "To Do",
    };
    setTasks((prevTasks) =>
      [newTask, ...prevTasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
  };

  
  const completeTask = async (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
    toast.success("Task marked as complete!");
  };


  const deleteTask = async (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  
  const updateTask = async (id, newTitle, newDescription) => {
    const currentTime = new Date().toLocaleString();
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle,
            description: newDescription,
            updatedAt: currentTime,
          }
        : task
    );
    const updatedTask = updatedTasks.find((task) => task.id === id);
    const sortedTasks = [updatedTask, ...updatedTasks.filter((t) => t.id !== id)];
    setTasks(sortedTasks);
    toast.success("Task updated successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>To-Do App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TaskInput onAddTask={addTask} />
              <TaskList
                tasks={tasks}
                onComplete={completeTask}
                onDelete={deleteTask}
              />
            </>
          }
        />
        <Route
          path="/task/:id"
          element={<TaskDetails tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
