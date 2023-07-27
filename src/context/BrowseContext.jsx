/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";

const BrowseContext = createContext();

const BASE_URL = "https://api.spotify.com/v1";

export const BrowseProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    data: [],
    query: "",
    error: "",
    isLoading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "categories/loaded":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case "error":
        return { ...state, error: action.payload.message, isLoading: false };
    }
  };

  const [{ data, query }, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowseContext.Provider value={{ data, query, dispatch }}>
      {children}
    </BrowseContext.Provider>
  );
};

export const useBrowse = () => {
  return useContext(BrowseContext);
};
