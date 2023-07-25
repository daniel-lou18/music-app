import { useFavorites } from "../../context/FavoritesContext";
import Results from "../Containers/Results";
import ListContainer from "../Containers/ListContainer";
import HorizontalList from "../HorizontalList";
import styles from "./FavArtists.module.css";

function FavArtists() {
  const { favoritesData } = useFavorites();
  const artists = favoritesData.filter((item) => item.type === "artist");
  console.log(artists);

  return (
    <Results className={styles.results}>
      {artists.length === 0 && <div>No favorite artists...</div>}
      {artists.length > 0 && (
        <>
          <ListContainer className={styles.listContainer}>
            <HorizontalList items={artists} title="Favorite artists" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavArtists;
