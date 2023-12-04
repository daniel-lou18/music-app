import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import { useNavigate } from "react-router-dom";
import { useRatedSongsOperations } from "../hooks/useRatedOperations";
import CompoundList from "../components/HorizontalList/CompoundList";
import Row from "../components/UI-elements/Row/Row";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const sortOptions = [
  { value: "rating-desc", label: "Sort by rating (descending)" },
  { value: "rating-asc", label: "Sort by rating (ascending)" },
  { value: "name-asc", label: "Sort by song name (A-Z)" },
  { value: "name-desc", label: "Sort by song name (Z-A)" },
  { value: "artist-asc", label: "Sort by artist name (A-Z)" },
  { value: "artist-desc", label: "Sort by artist name (Z-A)" },
];

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
          <CompoundList items={tracks} first={true}>
            <Row>
              <CompoundList.Title>Rated songs</CompoundList.Title>
              <CompoundList.Filter
                fieldName="subscription"
                options={filterOptions}
              />
              <CompoundList.Sort options={sortOptions} />
            </Row>
            <CompoundList.TrackList type="big" />
          </CompoundList>
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedSongs;
