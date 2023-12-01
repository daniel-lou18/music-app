import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import InfoMsg from "../components/InfoMsg";
import { useNavigate } from "react-router-dom";
import FavSongsOperations from "../components/Operations/FavSongsOperations";
import { useFavoriteSongsOperations } from "../hooks/useFavoritesOperations";

function FavSongs() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  let tracks = favoritesData.filter((item) => item.type === "track");
  console.log(tracks);

  tracks = useFavoriteSongsOperations(tracks);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
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
          <TrackList
            tracks={tracks}
            title={<FavSongsOperations />}
            type="big"
            first={true}
          />
        )}
      </ListContainer>
    </Results>
  );
}

export default FavSongs;
