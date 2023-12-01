import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import { useNavigate } from "react-router-dom";
import RatedSongsOperations from "../components/Operations/RatedSongsOperations";
import { useRatedSongsOperations } from "../hooks/useRatedOperations";

function RatedSongs() {
  const navigate = useNavigate();
  const { ratedData } = useRated();
  let tracks = ratedData.filter((item) => item.type === "track");
  console.log(ratedData);

  tracks = useRatedSongsOperations(tracks);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      <ListContainer type="favoritePage" className="container-favorite-songs">
        {tracks.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Songs you rate will appear here"
            paragraph_1="Rate songs by clicking on a star"
            paragraph_2="Remove ratings by clicking two times on the first star"
            btnText="Find songs"
            onClick={handleClick}
          />
        )}
        {tracks.length > 0 && (
          <TrackList
            tracks={tracks}
            title={<RatedSongsOperations />}
            type="big"
            first={true}
          />
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedSongs;
