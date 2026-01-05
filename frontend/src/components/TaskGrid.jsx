import TaskCard from "./TaskCard";

function TaskGrid({ tasks, setTasks }) {

  const toggleStatus = (id) => {
    fetch(`https://tasker-backend-4xbv.onrender.com/tasks/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to update task");
        }
        return res.json();
      })
      .then(updatedTask => {
        console.log("UPDATED TASK FROM BACKEND:", updatedTask);

        setTasks(prev =>
          prev.map(t =>
            t.id === updatedTask.id ? updatedTask : t
          )
        );
      })
      .catch(err => {
        alert(err.message);
        console.error("UPDATE ERROR:", err);
      });
  };

  const deleteTask = (id) => {
    fetch(`https://tasker-backend-4xbv.onrender.com/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to delete task");
        }
        setTasks(prev => prev.filter(t => t.id !== id));
      })
      .catch(err => {
        alert(err.message);
        console.error("DELETE ERROR:", err);
      });
  };

  return (
    <div className="task-grid">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={toggleStatus}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskGrid;
