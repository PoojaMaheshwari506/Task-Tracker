import { useState } from "react";

function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Add New Task</h3>

        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
