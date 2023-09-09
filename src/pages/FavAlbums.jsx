import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";
import NavLinkItem from "../components/NavBar/NavLinkItem";
import LogoIcon from "../components/UI-elements/LogoIcon";

function FavAlbums() {
  const { favoritesData } = useFavorites();
  const albums = favoritesData.filter((item) => item.type === "album");
  console.log(albums);

  return (
    <Results>
      <NavLinkItem
        to={""}
        icon={<LogoIcon />}
        text={
          <h1>
            Spoti<span>Lite</span>
          </h1>
        }
        end={true}
        className="logoMobile"
      />
      <TopBar>
        <NavBtns />
      </TopBar>
      {albums.length === 0 && <div>No favorite albums...</div>}
      {albums.length > 0 && (
        <>
          <ListContainer type="favoritePage">
            <HorizontalList items={albums} title="Favorite albums" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavAlbums;
