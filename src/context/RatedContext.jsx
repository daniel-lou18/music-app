import { useContext, createContext, useReducer, useEffect } from "react";

const RatedContext = createContext();

const BASE_URL = "http://localhost:3000";

export const RatedProvider = ({ children }) => {
  const initialState = {
    ratedData: [],
    error: "",
    isLoading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "loaded":
        return { ...state, ratedData: action.payload, isLoading: false };
      case "error":
        return { ...state, error: action.payload.message, isLoading: false };
      case "added":
        return {
          ...state,
          ratedData: [...state.ratedData, action.payload],
          isLoading: false,
        };
      case "removed":
        return {
          ...state,
          ratedData: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
  };

  const [{ ratedData }, dispatchRated] = useReducer(reducer, initialState);
  console.log(ratedData);

  useEffect(() => {
    const fetchRated = async () => {
      try {
        dispatchRated({ type: "loading" });
        const res = await fetch(`${BASE_URL}/rated`);
        const data = await res.json();
        dispatchRated({ type: "loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatchRated({ type: "error", payload: err });
      }
    };

    fetchRated();
  }, []);

  const addRated = async (item, rating) => {
    try {
      dispatchRated({ type: "loading" });
      const res = await fetch(`${BASE_URL}/rated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, rating }),
      });
      const data = await res.json();
      dispatchRated({ type: "added", payload: data });
    } catch (err) {
      console.error(err);
      dispatchRated({ type: "error", payload: err });
    }
  };

  const removeRated = async (id) => {
    try {
      dispatchRated({ type: "loading" });
      await fetch(`${BASE_URL}/rated/${id}`, {
        method: "DELETE",
      });
      dispatchRated({
        type: "removed",
        payload: ratedData.filter((item) => item.id !== id),
      });
    } catch (err) {
      console.error(err);
      dispatchRated({ type: "error", payload: err });
    }
  };

  return (
    <RatedContext.Provider
      value={{ ratedData, dispatchRated, addRated, removeRated }}
    >
      {children}
    </RatedContext.Provider>
  );
};

export const useRated = () => {
  return useContext(RatedContext);
};
