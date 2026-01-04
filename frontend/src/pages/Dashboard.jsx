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
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return;
  }

  fetch("http://127.0.0.1:5000/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then((data) => {
      console.log("TASKS FROM BACKEND:", data);
      setTasks(data);
    })
    .catch((err) => {
      console.error("Error fetching tasks:", err.message);
      setTasks([]); // prevent crash
    });
}, []);



  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const [search, setSearch] = useState("");
  const filteredTasks = Array.isArray(tasks)? tasks.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
  : [];


const addTask = ({ title, priority, due_date }) => {
  fetch("http://127.0.0.1:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      title,
      priority,
      due_date,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add task");
      }
      return res.json();
    })
    .then((newTask) => {
      setTasks((prev) => [...prev, newTask]);
      setShowModal(false);
    })
    .catch((err) => {
      alert(err.message);
      console.error("ADD TASK ERROR:", err.message);
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
