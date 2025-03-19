import NavBar from "../components/Nav";
import "../scss/Login.scss";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <NavBar />
      <div>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle"></i>
            <h1>Sign In</h1>

            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <NavLink to="/profil" className="sign-in-button">
              Sign In
            </NavLink>
          </section>
        </main>
      </div>
    </>
  );
};

export default Login;
