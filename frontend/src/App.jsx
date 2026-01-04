import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import "./styles/theme.css";
import "./styles/layout.css";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`app ${theme}`}>
      <Dashboard theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
