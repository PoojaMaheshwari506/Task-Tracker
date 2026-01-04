import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import TaskGrid from "../components/TaskGrid";
import AddTaskModal from "../components/AddTaskModal";
import "../styles/dashboard.css";

function Dashboard({ theme, setTheme }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

 useEffect(() => {
  fetch("http://127.0.0.1:5000/tasks")
    .then((res) => res.json())
    .then((data) => {
      console.log("TASKS FROM BACKEND:", data);
      setTasks(data);
    });
}, []);


  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const [search, setSearch] = useState("");
    const filteredTasks = tasks.filter(t =>   // ✅ ADD HERE
    t.title.toLowerCase().includes(search.toLowerCase())
  );

const addTask = ({ title, priority, due_date }) => {
  fetch("http://127.0.0.1:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      priority,
      due_date,
    }),
  })
    .then(res => res.json())
    .then(newTask => {
      setTasks(prev => [...prev, newTask]); // cleaner UX
      setShowModal(false);
    });
};

console.log("Dashboard rendered");


  return (
    <div className="dashboard">
      <Sidebar
  onLogout={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }}
/>

      <div className="main">
        <Topbar theme={theme} setTheme={setTheme}  search={search}
  setSearch={setSearch} />

<button  className="add-task-btn" onClick={() => setShowModal(true)}>
   Add Task
</button>

{showModal && (
  <AddTaskModal
    onAdd={addTask}   // ✅ backend connected
    onClose={() => setShowModal(false)}
  />
)}



        <div className="stats">
          <StatCard title="Total Tasks" value={total} />
          <StatCard title="Completed" value={completed} />
          <StatCard title="Pending" value={pending} />
        </div>

        <TaskGrid tasks={filteredTasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default Dashboard;
