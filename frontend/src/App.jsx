import "./index.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { addTokenToHeaders } from "./services/apiService.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  useEffect(addTokenToHeaders, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            exact
            path="/register"
            element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            exact
            path="/logout"
            element={<LogoutPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            exact
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
