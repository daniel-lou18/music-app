import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";

function FavAlbums() {
  const { favoritesData } = useFavorites();
  const albums = favoritesData.filter((item) => item.type === "album");
  console.log(albums);

  return (
    <Results>
      <TopBar>
        <NavBtns />
      </TopBar>
      {albums.length === 0 && <div>No favorite albums...</div>}
      {albums.length > 0 && (
        <>
          <ListContainer>
            <HorizontalList items={albums} title="Favorite albums" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavAlbums;
