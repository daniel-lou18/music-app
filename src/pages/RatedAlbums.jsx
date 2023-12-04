import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import { useRatedAlbumsOperations } from "../hooks/useRatedOperations";
import { useNavigate } from "react-router-dom";
import CompoundList from "../components/HorizontalList/CompoundList";
import Row from "../components/UI-elements/Row/Row";

const sortOptions = [
  { value: "rating-desc", label: "Sort by rating (descending)" },
  { value: "rating-asc", label: "Sort by rating (ascending)" },
  { value: "name-asc", label: "Sort by album name (A-Z)" },
  { value: "name-desc", label: "Sort by album name (Z-A)" },
  { value: "artist-asc", label: "Sort by artist name (A-Z)" },
  { value: "artist-desc", label: "Sort by artist name (Z-A)" },
  { value: "release_date-asc", label: "Sort by date (ascending)" },
  { value: "release_date-desc", label: "Sort by date (descending)" },
];

function RatedAlbums() {
  const navigate = useNavigate();
  const { ratedData } = useRated();
  let albums = ratedData.filter((item) => item.type === "album");

  albums = useRatedAlbumsOperations(albums);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      <ListContainer type="favoritePage">
        {albums.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Albums you rate will appear here"
            paragraph_1="Rate albums by clicking on a star"
            paragraph_2="Remove ratings by clicking two times on the first star"
            btnText="Find albums"
            onClick={handleClick}
          />
        )}
        {albums.length > 0 && (
          <CompoundList items={albums} first={true} type="albums">
            <Row>
              <CompoundList.Title>Rated albums</CompoundList.Title>
              <CompoundList.Sort options={sortOptions} />
            </Row>
            <CompoundList.RatedList />
          </CompoundList>
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedAlbums;
