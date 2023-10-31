import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Spinner from "../components/UI-elements/Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, getToken, token, getCurrentUser } =
    useAuth();

  useEffect(() => {
    const loadToken = async () => {
      if (!token) await getToken();
    };
    loadToken();
  }, [isAuthenticated, token, getToken]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
    // if (!isAuthenticated && user) {
    //   getToken();
    //   dispatch({
    //     type: "user/logged-in",
    //     payload: JSON.parse(user),
    //   });
    //   login(JSON.parse(currentUser).email, JSON.parse(currentUser).password);
    // }
  }, [isAuthenticated, navigate, isLoading, token, location]);

  if (isLoading) return <Spinner />;

  return isAuthenticated && !isLoading ? children : null;
}

export default ProtectedRoute;
