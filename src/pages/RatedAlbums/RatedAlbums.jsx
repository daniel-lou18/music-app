import Results from "../../components/Containers/Results";
import ListContainer from "../../components/Containers/ListContainer";
import RatedList from "../../components/RatedList";
import styles from "./RatedAlbums.module.css";
import { useRated } from "../../context/RatedContext";

function RatedAlbums() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated albums...</div>;
  const albums = ratedData.filter((item) => item.type === "album");
  console.log(albums);

  return (
    <Results className={styles.results}>
      {albums.length === 0 && <div>No rated albums...</div>}
      {albums.length > 0 && (
        <>
          <ListContainer className={styles.listContainer}>
            <RatedList items={albums} title="Rated albums" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default RatedAlbums;
