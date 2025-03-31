import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout, getUserProfile } from "../redux/userSlice"; 
import logo from "../assets/images/argentBankLogo.png";
import "../scss/Nav.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userName, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };

  
  const handleProfileClick = () => {
    navigate("/profil"); 
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-right">
        {user ? (
          <>
        
            <span 
              className="main-nav-item user-name "
              onClick={handleProfileClick} 
              style={{ cursor: "pointer", marginRight: "10px" }}
              
            >
              <i className="fa fa-user-circle"></i>
              {userName} 
            </span>
            
        
            <button className="main-nav-item logout-button" onClick={handleLogout}>
              <i className="fa fa-sign-out-alt"></i> Se Déconnecter
            </button>

          </>
        ) : (
          <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle" ></i> Sign In
        </NavLink>        
        )}
      </div>
    </nav>
  );
};

export default NavBar;
