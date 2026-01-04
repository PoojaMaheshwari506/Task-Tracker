import { useState } from "react";

function AddTaskModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd({
      title,
      priority,
      due_date: dueDate,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">

        <h2 className="modal-title">Add new task</h2>

        <input
          className="modal-input title-input"
          placeholder="What do you want to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="modal-row">
          <select
            className="modal-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low priority</option>
            <option value="Medium">Medium priority</option>
            <option value="High">High priority</option>
          </select>

          <input
            className="modal-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleSubmit}>
            Add Task
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddTaskModal;
