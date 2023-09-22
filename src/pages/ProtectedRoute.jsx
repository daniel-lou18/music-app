import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, login, getToken } = useAuth();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!isAuthenticated && !currentUser) navigate("/login");
    if (!isAuthenticated && currentUser) {
      getToken();
      login(JSON.parse(currentUser).email, JSON.parse(currentUser).password);
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
