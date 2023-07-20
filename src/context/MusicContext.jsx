/* eslint-disable react/prop-types */
import { createContext, useContext, useLayoutEffect, useReducer } from "react";

import { useAuth } from "./AuthContext";

const BASE_URL = "https://api.spotify.com/v1";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    data: [],
    query: "coltrane",
    error: "",
    isLoading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "search/query":
        return { ...state, query: action.payload };
      case "search/loading":
        return { ...state, error: "", isLoading: true };
      case "search/loaded":
        return { ...state, data: action.payload, isLoading: false };
      case "search/error":
        if (action.payload.name === "AbortError") return state;
        return { ...state, error: action.payload.message, isLoading: false };
      default:
        return state;
    }
  };

  const [{ data, query, error, isLoading, playId }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useLayoutEffect(() => {
    if (!query || !token) return;
    const controller = new AbortController();

    const fetchMusic = async () => {
      try {
        dispatch({ type: "search/loading" });
        const res = await fetch(
          `${BASE_URL}/search?q=${query}&type=artist,track,album&limit=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
            signal: controller.signal,
          }
        );
        const data = await res.json();
        console.log(data);
        dispatch({ type: "search/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "search/error", payload: err });
      }
    };

    fetchMusic();
    return () => controller.abort();
  }, [token, query]);

  return (
    <MusicContext.Provider
      value={{ data, query, error, isLoading, playId, dispatch }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};
