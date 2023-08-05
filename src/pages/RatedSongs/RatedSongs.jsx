import Results from "../../components/Containers/Results";
import ListContainer from "../../components/Containers/ListContainer";
import TrackList from "../../components/TrackList";
import styles from "./RatedSongs.module.css";
import { useRated } from "../../context/RatedContext";

function RatedSongs() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated tracks...</div>;
  const tracks = ratedData.filter((item) => item.type === "track");
  console.log(tracks);

  return (
    <Results className={styles.results}>
      {tracks.length === 0 && <div>No rated tracks...</div>}
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

export default RatedSongs;
