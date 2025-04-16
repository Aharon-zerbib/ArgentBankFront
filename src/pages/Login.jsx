import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userSlice";
import NavBar from "../components/Nav";
import "../scss/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // État pour le message d'erreur
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  //si il trouve user alors page profil
  useEffect(() => {
    if (user) {
      navigate("/profil");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    try {
      // Dispatch de l'action loginUser
      await dispatch(loginUser(userCredentials)).unwrap();
      setError(""); // Réinitialise l'erreur en cas de succès
    } catch (err) {
      // Capture et affiche l'erreur
      setError("Désolé, email ou mot de passe incorrect.");
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              {error && <p className="error-message">{error}</p>} {/* Affiche le message d'erreur */}
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Login;
