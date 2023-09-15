import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";
import NavLinkItem from "../components/NavBar/NavLinkItem";
import LogoIcon from "../components/UI-elements/LogoIcon";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import InfoMsg from "../components/InfoMsg";
import { useNavigate } from "react-router-dom";

function FavSongs() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  const tracks = favoritesData.filter((item) => item.type === "track");
  console.log(tracks);

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

      <ListContainer type="favoritePage" className="container-favorite-songs">
        {tracks.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Songs you like will appear here"
            paragraph_1="Save songs by clicking on the heart icon"
            btnText="Find songs"
            onClick={handleClick}
          />
        )}
        {tracks.length > 0 && (
          <TrackList tracks={tracks} title="Favorite songs" type="big" />
        )}
      </ListContainer>
    </Results>
  );
}

export default FavSongs;
