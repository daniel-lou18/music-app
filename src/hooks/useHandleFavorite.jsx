import { useFavorites } from "../context/FavoritesContext";

export function useHandleFavorite(id, item, setShowAlert) {
  const { addFavorite, removeFavorite } = useFavorites();

  return function () {
    if (!id) {
      addFavorite(item);
      setShowAlert(false);
    } else {
      removeFavorite(id);
      setShowAlert(true);
    }
  };
}
