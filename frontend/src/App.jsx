import { useState } from "react";
import { isLoggedIn } from "./auth/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./styles/theme.css";
import "./styles/layout.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className={`app ${theme}`}>
      {isLoggedIn() ? (
        <Dashboard theme={theme} setTheme={setTheme} />
      ) : showSignup ? (
        <Signup onSwitch={() => setShowSignup(false)} />
      ) : (
        <Login onSwitch={() => setShowSignup(true)} />
      )}
    </div>
  );
}
export default App;
