import { createContext, useCallback, useContext, useReducer } from "react";
import supabase from "../services/supabase";

const SPOTIFY_URL = "https://accounts.spotify.com/api/token";
const body =
  "grant_type=client_credentials&client_id=625e44fdf4c54d3ab62a5d1c95e3f353&client_secret=9401a23a8e6c47bdac04f93de44f7890";
const JSON_URL = "http://localhost:3000";
const API_URL = "http://localhost:3030/api/v1";

const AuthContext = createContext();

const initialState = {
  token: "",
  error: "",
  isLoading: false,
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "token/loaded":
      return { ...state, isLoading: false, token: action.payload };
    case "user/created":
      return { ...state, isLoading: false };
    case "user/logged-in":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "user/logged-out":
      return { ...state, isAuthenticated: false, user: null };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

export const AuthProvider = ({ children }) => {
  const [{ token, error, isLoading, user, isAuthenticated }, dispatch] =
    useReducer(reducer, initialState);

  const getToken = useCallback(async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${SPOTIFY_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });
      if (!res.ok)
        throw new Error(`${res.status} Could not get an access token`);
      const data = await res.json();
      dispatch({ type: "token/loaded", payload: data.access_token });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err.message });
    }
  }, []);

  const signup = useCallback(
    async ({ firstName, lastName, email, password }) => {
      dispatch({ type: "loading" });
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              firstName,
              lastName,
            },
          },
        });
        if (error) throw new Error(error.message);
        if (data) dispatch({ type: "user/created" });
        return data;
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err.message });
      }
    }
  );

  const login = useCallback(async ({ email, password }) => {
    dispatch({ type: "loading" });
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      console.log(data);
      if (data)
        dispatch({
          type: "user/logged-in",
          payload: {
            access_token: data.session.access_token,
            first_name: "Loutje",
            last_name: "Patapoutje",
            email,
            password,
            profile_picture: {
              url: "/IMG-20220323-WA0009.png",
            },
          },
        });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err.message });
    }
  }, []);

  // const login = useCallback(async (email, password) => {
  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await fetch(`${JSON_URL}/users`);
  //     if (!res.ok) throw new Error(`${res.status}: Could not get users`);
  //     const data = await res.json();
  //     const user = data.filter(
  //       (user) => user.email === email && user.password === password
  //     )[0];
  //     if (user) dispatch({ type: "user/logged-in", payload: user });
  //     if (!user) throw new Error("Wrong email or password");
  //   } catch (err) {
  //     console.error(err);
  //     dispatch({ type: "error", payload: err.message });
  //   }
  // }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "user/logged-out" });
  };

  const forgotPassword = useCallback(async (email) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${API_URL}/users/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log(res);
      if (!res.ok)
        throw new Error(
          `${res.status} Could not find any user with this email`
        );
      const data = await res.json();
    } catch (err) {
      console.error(err.message);
      dispatch({ type: "error", payload: err.message });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        error,
        getToken,
        signup,
        login,
        logout,
        forgotPassword,
        user,
        isAuthenticated,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
