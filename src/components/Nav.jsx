import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/argentBankLogo.png";
import "../scss/Nav.scss";

const NavBar = () => {
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
        <NavLink to="/profil" className="main-nav-item"></NavLink>
        <NavLink className="main-nav-item" to="/login">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
