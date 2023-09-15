import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";
import NavLinkItem from "../components/NavBar/NavLinkItem";
import LogoIcon from "../components/UI-elements/LogoIcon";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import { useNavigate } from "react-router-dom";

function FavArtists() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  const artists = favoritesData.filter((item) => item.type === "artist");

  const handleClick = () => navigate("/app/search");

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

      <ListContainer type="favoritePage">
        {artists.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Artists you like will appear here"
            paragraph_1="Save artists by clicking on the heart icon"
            btnText="Find artists"
            onClick={handleClick}
          />
        )}
        {artists.length > 0 && (
          <HorizontalList items={artists} title="Favorite artists" />
        )}
      </ListContainer>
    </Results>
  );
}

export default FavArtists;
