import { useContext, createContext, useReducer, useEffect } from "react";

const FavoritesContext = createContext();

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
    const data = JSON.parse(localStorage.getItem("favorites"));
    if (!data) return;
    console.log(data);
    dispatchFavorites({ type: "loaded", payload: data });
  }, []);

  const addFavorite = (item) => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    data.push(item);
    dispatchFavorites({ type: "loaded", payload: data });
    localStorage.setItem("favorites", JSON.stringify(data));
  };

  const removeFavorite = (id) => {};

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
