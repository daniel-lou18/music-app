import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import { useNavigate } from "react-router-dom";

function RatedSongs() {
  const navigate = useNavigate();
  const { ratedData } = useRated();
  const tracks = ratedData.filter((item) => item.type === "track");

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
          <TrackList tracks={tracks} title="Rated songs" type="big" />
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedSongs;
