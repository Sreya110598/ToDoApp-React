import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, onComplete, onEdit, onDelete }) => (
  <div>
    {tasks.map((task) => (
      <div
        key={task.id}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <div><strong>Title:</strong> {task.title}</div>
        <div><strong>Description:</strong> {task.description}</div>
        <div><strong>Created:</strong> {task.createdAt}</div>
        <div><strong>Updated:</strong> {task.updatedAt}</div>
        <div><strong>Status:</strong> {task.status}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => onComplete(task.id)} style={{ backgroundColor: "green", color: "#fff" }}>✔</button>
          <button onClick={() => onEdit(task)} style={{ backgroundColor: "blue", color: "#fff" }}>✎</button>
          <button onClick={() => onDelete(task.id)} style={{ backgroundColor: "red", color: "#fff" }}>🗑</button>
          <Link to={`/task/${task.id}`} style={{ backgroundColor: "purple", color: "#fff", padding: "5px 10px", textDecoration: "none" }}>View Details</Link>
        </div>
      </div>
    ))}
  </div>
);

export default TaskList;
