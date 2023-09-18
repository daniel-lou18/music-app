import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList";
import InfoMsg from "../components/InfoMsg/";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import { useNavigate } from "react-router-dom";

function FavAlbums() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  const albums = favoritesData.filter((item) => item.type === "album");

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      {/* <NavLinkItem
        to={""}
        icon={<LogoIcon />}
        text={
          <h1>
            Spoti<span>Lite</span>
          </h1>
        }
        end={true}
        className="logoMobile"
      /> */}
      {/* <>
        <NavBtns />
      </> */}
      <ListContainer type="favoritePage">
        {albums.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Albums you like will appear here"
            paragraph_1="Save albums by clicking on the heart icon"
            btnText="Find albums"
            onClick={handleClick}
          />
        )}
        {albums.length > 0 && (
          <HorizontalList items={albums} title="Favorite albums" />
        )}
      </ListContainer>
    </Results>
  );
}

export default FavAlbums;
