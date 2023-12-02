import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import RatedList from "../components/RatedList";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import RatedArtistsOperations from "../components/Operations/RatedArtistsOperations";
import { useRatedArtistsOperations } from "../hooks/useRatedOperations";
import { useNavigate } from "react-router-dom";

function RatedArtists() {
  const navigate = useNavigate();
  const { ratedData } = useRated();
  let artists = ratedData.filter((item) => item.type === "artist");

  console.log(artists);

  artists = useRatedArtistsOperations(artists);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
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
          <RatedList
            items={artists}
            title={<RatedArtistsOperations />}
            first={true}
          />
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedArtists;
