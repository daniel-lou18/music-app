import { useFavorites } from "../../context/FavoritesContext";
import Results from "../../components/Containers/Results";
import ListContainer from "../../components/Containers/ListContainer";
import TrackList from "../../components/TrackList";
import styles from "./FavSongs.module.css";

function FavSongs() {
  const { favoritesData } = useFavorites();
  const tracks = favoritesData.filter((item) => item.type === "track");
  console.log(tracks);

  return (
    <Results className={styles.results}>
      {tracks.length === 0 && <div>No favorite tracks...</div>}
      {tracks.length > 0 && (
        <>
          <ListContainer className={styles.listContainer}>
            <TrackList tracks={tracks} title="Favorite songs" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavSongs;