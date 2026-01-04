import TaskCard from "./TaskCard";

function TaskGrid({ tasks, setTasks }) {

const toggleStatus = (id) => {
  fetch(`http://127.0.0.1:5000/tasks/${id}`, {
    method: "PATCH",
  })
    .then(res => res.json())
    .then(updatedTask => {
      console.log("UPDATED TASK FROM BACKEND:", updatedTask);

      setTasks(prev =>
        prev.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      );
    });
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
