import OperationsContainer from "../Containers/OperationsContainer";
import Row from "../UI-elements/Row/Row";
import SortBy from "../UI-elements/SortBy/SortBy";

const sortOptions = [
  { value: "rating-desc", label: "Sort by rating (descending)" },
  { value: "rating-asc", label: "Sort by rating (ascending)" },
  { value: "name-asc", label: "Sort by album name (A-Z)" },
  { value: "name-desc", label: "Sort by album name (Z-A)" },
  { value: "artist-asc", label: "Sort by artist name (A-Z)" },
  { value: "artist-desc", label: "Sort by artist name (Z-A)" },
  { value: "release_date-asc", label: "Sort by release date (ascending)" },
  { value: "release_date-desc", label: "Sort by relase date (descending)" },
];

function RatedAlbumsOperations() {
  return (
    <OperationsContainer type="albums">
      <Row>
        <span className="title">Rated albums</span>
        <SortBy options={sortOptions} />
      </Row>
    </OperationsContainer>
  );
}

export default RatedAlbumsOperations;
