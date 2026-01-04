import "../styles/sidebar.css";

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2 className="logo">Tasker</h2>

        <nav className="menu">
          <a className="active">Dashboard</a>
          <a>Tasks</a>
          <a>Analytics</a>
          <a>Settings</a>
        </nav>
      </div>

      <button className="sidebar-logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
