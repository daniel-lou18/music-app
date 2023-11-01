import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Spinner from "../components/UI-elements/Spinner";
import supabase from "../services/supabase";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, getToken, dispatch } = useAuth();

  useEffect(() => {
    dispatch({ type: "loading" });
    const auth = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          navigate("login");
          return dispatch({ type: "user/logged-out" });
        }
        const { data, error } = await supabase.auth.getUser();
        if (error) throw new Error(error.message);
        if (data) {
          await getToken();
          dispatch({
            type: "user/logged-in",
            payload: {
              access_token: session.session.access_token,
              firstName: data.user.user_metadata.firstName,
              lastName: data.user.user_metadata.firstName,
              email: data.user.email,
              profile_picture: {
                url: "/IMG-20220323-WA0009.png",
              },
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: "error" });
      }
    };
    auth();
  }, [dispatch, getToken, navigate]);

  // useEffect(() => {
  //   const loadToken = async () => {
  //     if (!token) await getToken();
  //   };
  //   loadToken();
  // }, [isAuthenticated, token, getToken]);

  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     navigate("/login");
  //   }
  //   if (!isAuthenticated && user) {
  //     getToken();
  //     dispatch({
  //       type: "user/logged-in",
  //       payload: JSON.parse(user),
  //     });
  //     login(JSON.parse(currentUser).email, JSON.parse(currentUser).password);
  //   }
  // }, [isAuthenticated, navigate, isLoading, token, location]);

  if (isLoading) return <Spinner />;

  return isAuthenticated && !isLoading ? children : null;
}

export default ProtectedRoute;
