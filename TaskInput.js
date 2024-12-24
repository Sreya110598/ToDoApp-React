import React, { useState } from "react";
import toast from "react-hot-toast";

const TaskInput = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitle.trim() && description.trim()) {
      await onAddTask(taskTitle, description);
      setTaskTitle("");
      setDescription("");
      toast.success("Task added successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task Title"
        style={{ padding: "10px", width: "40%", marginRight: "10px" }}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        style={{ padding: "10px", width: "40%", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "10px" }}>Add Task</button>
    </form>
  );
};

export default TaskInput;
