/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const BrowseContext = createContext();

const BASE_URL = "https://api.spotify.com/v1";

export const BrowseProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    genre: "",
    data: {},
    query: "",
    error: "",
    isLoading: false,
    isBrowsing: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "loaded":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          isBrowsing: true,
        };
      case "error":
        return { ...state, error: action.payload.message, isLoading: false };
      case "browse/genre":
        return { ...state, genre: action.payload, isBrowsing: false };
      case "reset":
        return {
          ...state,
          genre: "",
          data: {},
          isLoading: false,
          isBrowsing: false,
        };
    }
  };

  const [{ genre, data, query }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!token || !genre) return;

    const browseMusic = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(
          `${BASE_URL}/search?q=genre:${genre}&type=artist,track&limit=20`,
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
        dispatch({ type: "loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    };

    browseMusic();
  }, [token, genre]);

  return (
    <BrowseContext.Provider value={{ genre, data, query, dispatch }}>
      {children}
    </BrowseContext.Provider>
  );
};

export const useBrowse = () => {
  return useContext(BrowseContext);
};
