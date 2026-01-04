function Topbar({ theme, setTheme,search, setSearch }) {
  return (
    <div className="topbar">
    <input
  className="search-input"
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
export default Topbar;