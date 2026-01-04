import { useState } from "react";
import { isLoggedIn } from "./auth/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import "./styles/theme.css";
import "./styles/layout.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [showSignup, setShowSignup] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // 👈 NEW

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
        <Dashboard theme={theme} setTheme={setTheme} />
      )}

      {activePage === "analytics" && <Analytics />}
    </div>
  </div>
);

}

export default App;
