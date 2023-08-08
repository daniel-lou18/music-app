import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";

function FavSongs() {
  const { favoritesData } = useFavorites();
  const tracks = favoritesData.filter((item) => item.type === "track");
  console.log(tracks);

  return (
    <Results>
      <TopBar>
        <NavBtns />
      </TopBar>
      {tracks.length === 0 && <div>No favorite tracks...</div>}
      {tracks.length > 0 && (
        <>
          <ListContainer type="favoritePage">
            <TrackList tracks={tracks} title="Favorite songs" type="big" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavSongs;
