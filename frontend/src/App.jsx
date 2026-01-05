import { useState } from "react";
import { isLoggedIn } from "./auth/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import "./styles/theme.css";
import "./styles/layout.css";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  const [showSignup, setShowSignup] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // 👈 NEW
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("https://tasker-backend-4xbv.onrender.com/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => setTasks(data))
    .catch(() => setTasks([]));
}, []);


  if (!isLoggedIn()) {
    return showSignup ? (
      <Signup onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login onSwitch={() => setShowSignup(true)} />
    );
  }

return (
  <div className={`app ${theme}`}>
    <Sidebar
      setActivePage={setActivePage}
      onLogout={() => {
        localStorage.clear();
        window.location.reload();
      }}
    />

    <div className="main-content">
      {activePage === "dashboard" && (
  <Dashboard
    tasks={tasks}
    setTasks={setTasks}
    setActivePage={setActivePage}
  />
)}

{activePage === "analytics" && (
  <Analytics tasks={tasks} setActivePage={setActivePage} />
)}
    </div>
  </div>
);

}

export default App;
