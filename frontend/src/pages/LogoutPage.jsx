import { useEffect } from "react";
import { logout } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

const LogoutPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      logout();
      setIsAuthenticated(false);
      navigate("/login");
    };

    handleLogout();
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default LogoutPage;
