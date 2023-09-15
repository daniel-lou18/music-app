import { useContext, createContext, useReducer, useEffect } from "react";

const FavoritesContext = createContext();

const BASE_URL = "http://localhost:3000";

export const FavoritesProvider = ({ children }) => {
  const initialState = {
    favoritesData: [],
    error: "",
    isLoading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "loaded":
        return { ...state, favoritesData: action.payload, isLoading: false };
      case "error":
        return { ...state, error: action.payload.message, isLoading: false };
      case "added":
        return {
          ...state,
          favoritesData: [...state.favoritesData, action.payload],
          isLoading: false,
        };
      case "removed":
        return {
          ...state,
          favoritesData: action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
  };

  const [{ favoritesData }, dispatchFavorites] = useReducer(
    reducer,
    initialState
  );
  console.log(favoritesData);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        dispatchFavorites({ type: "loading" });
        const res = await fetch(`${BASE_URL}/favorites`);
        const data = await res.json();
        dispatchFavorites({ type: "loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatchFavorites({ type: "error", payload: err });
      }
    };

    fetchFavorites();
  }, []);

  const addFavorite = async (item) => {
    try {
      dispatchFavorites({ type: "loading" });
      const res = await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item }),
      });
      const data = await res.json();
      dispatchFavorites({ type: "added", payload: data });
    } catch (err) {
      console.error(err);
      dispatchFavorites({ type: "error", payload: err });
    }
  };

  const removeFavorite = async (id) => {
    try {
      dispatchFavorites({ type: "loading" });
      await fetch(`${BASE_URL}/favorites/${id}`, {
        method: "DELETE",
      });
      dispatchFavorites({
        type: "removed",
        payload: favoritesData.filter((item) => item.id !== id),
      });
    } catch (err) {
      console.error(err);
      dispatchFavorites({ type: "error", payload: err });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoritesData, dispatchFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
