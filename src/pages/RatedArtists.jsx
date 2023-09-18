import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import RatedList from "../components/RatedList";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import { useNavigate } from "react-router-dom";

function RatedArtists() {
  const navigate = useNavigate();
  const { ratedData } = useRated();
  const artists = ratedData.filter((item) => item.type === "artist");

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
        {artists.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Artists you rate will appear here"
            paragraph_1="Rate artists by clicking on a star"
            paragraph_2="Remove ratings by clicking two times on the first star"
            btnText="Find artists"
            onClick={handleClick}
          />
        )}
        {artists.length > 0 && (
          <RatedList items={artists} title="Rated artists" />
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedArtists;
