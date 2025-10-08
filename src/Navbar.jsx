// Navbar.jsx
import React from "react";

function Navbar({ onNavigate, currentPage, theme, onThemeChange }) {
  // UPDATED: Added "shadow-sm" class for a subtle lift
  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme === "dark" ? "dark" : "light"} bg-${theme === "dark" ? "dark" : "light"} shadow-sm`}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#" onClick={(e) => { e.preventDefault(); onNavigate("editor"); }}>
          Synapse Editor
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${currentPage === "editor" ? "active" : ""}`} href="#" onClick={(e)=>{ e.preventDefault(); onNavigate("editor");}}>Editor</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${currentPage === "about" ? "active" : ""}`} href="#" onClick={(e)=>{ e.preventDefault(); onNavigate("about");}}>About</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select form-select-sm"
              value={theme}
              onChange={(e) => onThemeChange(e.target.value)}
              style={{ width: 150 }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="ocean">Ocean (Blue)</option>
              <option value="forest">Forest (Green)</option>
              <option value="sunset">Sunset (Orange)</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;