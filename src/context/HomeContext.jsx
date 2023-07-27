/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const HomeContext = createContext();

const BASE_URL = "https://api.spotify.com/v1";

export const HomeProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    data: [],
    newReleases: [],
    query: "",
    error: "",
    isLoading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "new-releases/loaded":
        return {
          ...state,
          newReleases: action.payload,
          isLoading: false,
        };
      case "error":
        return { ...state, error: action.payload.message, isLoading: false };
    }
  };

  const [{ data, newReleases, query, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (!token) return;

    const getNewReleases = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(
          `${BASE_URL}/browse/new-releases?country=FR&limit=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        dispatch({ type: "new-releases/loaded", payload: data.albums.items });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    };

    getNewReleases();
  }, [token]);

  return (
    <HomeContext.Provider value={{ data, newReleases, query, error, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  return useContext(HomeContext);
};
