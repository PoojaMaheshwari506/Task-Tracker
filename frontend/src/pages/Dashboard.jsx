import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import TaskGrid from "../components/TaskGrid";
import AddTaskModal from "../components/AddTaskModal";
import "../styles/dashboard.css";

function Dashboard({ theme, setTheme, setActivePage }) {
  const [tasks, setTasks] = useState([]);   // ✅ VERY IMPORTANT
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // 🔹 FETCH TASKS
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://tasker-backend-4xbv.onrender.com/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err.message);
        setTasks([]);
      });
  }, []);

  // 🔹 STATS
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 ADD TASK
  const addTask = ({ title, priority, due_date }) => {
    fetch("https://tasker-backend-4xbv.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, priority, due_date }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prev) => [...prev, newTask]);
        setShowModal(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="dashboard">
      <Sidebar
        setActivePage={setActivePage}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.reload();
        }}
      />

      <div className="main">
        <Topbar
          theme={theme}
          setTheme={setTheme}
          search={search}
          setSearch={setSearch}
        />

        <button className="add-task-btn" onClick={() => setShowModal(true)}>
          Add Task
        </button>

        {showModal && (
          <AddTaskModal
            onAdd={addTask}
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
