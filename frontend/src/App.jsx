import "./index.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { addTokenToHeaders } from "./services/apiService.js";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Wallets from "./components/Wallets.jsx";
import WalletForm from "./components/WalletForm.jsx";
import WalletDetails from "./components/WalletDetails.jsx";

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
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="login" />}
          >
            <Route index element={<Portfolio />}></Route>
            <Route path="wallets">
              <Route index element={<Wallets />}></Route>
              <Route path="create" element={<WalletForm />}></Route>
              <Route path=":walletId" element={<WalletDetails />}></Route>
            </Route>
          </Route>
          <Route
            exact
            path="login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            exact
            path="register"
            element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            exact
            path="logout"
            element={<LogoutPage setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
