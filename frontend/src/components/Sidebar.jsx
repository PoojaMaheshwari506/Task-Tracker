import "../styles/sidebar.css";

function Sidebar({ onLogout, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2>Tasker</h2>

        <ul className="sidebar-menu">
          <h3 onClick={() => setActivePage("dashboard")}>
            Dashboard
          </h3>

          <h3 onClick={() => setActivePage("analytics")}>
            Analytics
          </h3>

          <h3>
            Settings
          </h3>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;



