import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, login, getToken, dispatch } = useAuth();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!isAuthenticated && !currentUser) navigate("/login");
    if (!isAuthenticated && currentUser) {
      getToken();
      dispatch({
        type: "user/logged-in",
        payload: JSON.parse(currentUser),
      });
      // login(JSON.parse(currentUser).email, JSON.parse(currentUser).password);
    }
  }, [isAuthenticated, navigate, getToken, login, dispatch]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
