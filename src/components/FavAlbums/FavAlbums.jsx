import { useFavorites } from "../../context/FavoritesContext";
import Results from "../Containers/Results";
import ListContainer from "../Containers/ListContainer";
import HorizontalList from "../HorizontalList";
import styles from "./FavAlbums.module.css";

function FavAlbums() {
  const { favoritesData } = useFavorites();
  const albums = favoritesData.filter((item) => item.type === "album");
  console.log(albums);

  return (
    <Results className={styles.results}>
      {albums.length === 0 && <div>No favorite albums...</div>}
      {albums.length > 0 && (
        <>
          <ListContainer className={styles.listContainer}>
            <HorizontalList items={albums} title="Favorite albums" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavAlbums;
