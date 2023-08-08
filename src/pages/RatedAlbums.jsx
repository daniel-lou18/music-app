import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import RatedList from "../components/RatedList";
import { useRated } from "../context/RatedContext";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";

function RatedAlbums() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated albums...</div>;
  const albums = ratedData.filter((item) => item.type === "album");
  console.log(albums);

  return (
    <Results>
      <TopBar>
        <NavBtns />
      </TopBar>
      {albums.length === 0 && <div>No rated albums...</div>}
      {albums.length > 0 && (
        <>
          <ListContainer>
            <RatedList items={albums} title="Rated albums" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default RatedAlbums;
