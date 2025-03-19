import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/argentBankLogo.png";
import "../scss/Nav.scss";

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-right">
        {token ? (
          <button
            className="main-nav-item logout-button"
            onClick={handleLogout}
          >
            Se Déconnecter
          </button>
        ) : (
          <NavLink className="main-nav-item" to="/login">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
