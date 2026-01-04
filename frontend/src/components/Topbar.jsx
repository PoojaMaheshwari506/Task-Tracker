

function Topbar({ theme, setTheme, search, setSearch, onLogout }) {
  return (
    <div className="topbar">
      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Right actions */}
      <div className="topbar-actions">

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}

export default Topbar;
