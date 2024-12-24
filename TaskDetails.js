import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = ({ tasks, onUpdate, onDelete }) => {
  const { id } = useParams(); 
  const task = tasks.find((t) => t.id === parseInt(id)); 

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  if (!task) {
    return <div style={{ textAlign: "center", color: "red" }}>Task not found</div>;
  }

  
  const handleEdit = () => {
    setEditedTask(task); 
    setIsEditing(true); 
  };

  
  const handleSave = () => {
    onUpdate(editedTask.id, editedTask.title, editedTask.description); 
    setIsEditing(false); 
  };

  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id); 
    }
  };

  return (
    <div className="task-details">
      {isEditing ? (
        <>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <div className="action-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h2>Task Details</h2>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Created:</strong> {task.createdAt}</p>
          <p><strong>Updated:</strong> {task.updatedAt}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <div className="action-buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
