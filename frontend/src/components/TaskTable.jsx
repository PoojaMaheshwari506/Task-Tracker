function TaskTable({ tasks, setTasks }) {

const toggleStatus = (id) => {
  fetch(`http://127.0.0.1:5000/tasks/${id}`, {
    method: "PATCH",
  })
    .then(res => {
      console.log("PATCH status:", res.status);
      return res.json();
    })
    .then(updatedTask => {
      console.log("UPDATED TASK:", updatedTask);

      setTasks(prev =>
        prev.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      );
    })
    .catch(err => console.error("PATCH ERROR:", err));
};

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(prev => prev.filter(t => t.id !== id));
      });
  };


  return (
    <div className="table-card">
      <h3>All Tasks</h3>

      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>

              <td>
                <span
                  className={`status-pill ${t.completed ? "done" : "pending"}`}
                >
                  {t.completed ? "✅ Completed" : "⏳ Pending"}
                </span>
              </td>

              <td>
                <span
                  className="delete-btn"
                  onClick={() => deleteTask(t.id)}
                >
                  ❌
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
