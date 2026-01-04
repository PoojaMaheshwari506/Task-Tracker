function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="task-card">

      <div className="task-top">
        <h4>{task.title}</h4>

        <span className={`priority ${task.priority}`}>
          {task.priority}
        </span>
      </div>

      {task.due_date && (
        <div className="due-date">
          🗓 {task.due_date}
        </div>
      )}

      <div className="task-actions">
        <span
          className={`status-pill ${task.completed ? "done" : "pending"}`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

        <button onClick={() => onDelete(task.id)}>🗑</button>
      </div>

    </div>
  );
}

export default TaskCard;
