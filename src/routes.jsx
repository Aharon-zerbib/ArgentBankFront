import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profil from "./pages/Profil";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/profil" /> : <Login />}
        />
        <Route
          path="/profil"
          element={token ? <Profil /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />{" "}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
