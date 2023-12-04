import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import { useRatedArtistsOperations } from "../hooks/useRatedOperations";
import { useNavigate } from "react-router-dom";
import CompoundList from "../components/HorizontalList/CompoundList";
import Row from "../components/UI-elements/Row/Row";

const sortOptions = [
  { value: "rating-desc", label: "Sort by rating (descending)" },
  { value: "rating-asc", label: "Sort by rating (ascending)" },
  { value: "name-asc", label: "Sort by artist name (A-Z)" },
  { value: "name-desc", label: "Sort by artist name (Z-A)" },
];

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
          <CompoundList items={artists} first={true} type="albums">
            <Row>
              <CompoundList.Title>Rated artists</CompoundList.Title>
              <CompoundList.Sort options={sortOptions} />
            </Row>
            <CompoundList.RatedList />
          </CompoundList>
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedArtists;
