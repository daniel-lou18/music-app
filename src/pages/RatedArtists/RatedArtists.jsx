import Results from "../../components/Containers/Results";
import ListContainer from "../../components/Containers/ListContainer";
import HorizontalList from "../../components/HorizontalList";
import styles from "./RatedArtists.module.css";
import { useRated } from "../../context/RatedContext";

function RatedArtists() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated artists...</div>;
  const artists = ratedData.filter((item) => item.type === "artist");
  console.log(artists);

  return (
    <Results className={styles.results}>
      {artists.length === 0 && <div>No rated artists...</div>}
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

export default RatedArtists;
