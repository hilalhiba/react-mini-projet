import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-light fs-3 fw-bold" to="/gallery" activeClassName="active">
          <i className="bi bi-image-alt-fill"></i> Gallery
        </NavLink>
        <button
          className="navbar-toggler border-0 text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link text-light px-4 py-2 hover-effect"
                to="/gallery"
                activeClassName="active"
              >
                <i className="bi bi-house-door"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-light px-4 py-2 hover-effect"
                to="/link"
                activeClassName="active"
              >
                <i className="bi bi-link-45deg"></i> Link
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle text-light px-4 py-2 hover-effect"
                type="button"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list-ul"></i> Dropdown
              </button>
              <ul className="dropdown-menu custom-dropdown" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/option1"
                    activeClassName="active"
                  >
                    Option 1
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/option2"
                    activeClassName="active"
                  >
                    Option 2
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;