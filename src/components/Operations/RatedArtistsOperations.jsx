import OperationsContainer from "../Containers/OperationsContainer";
import Row from "../UI-elements/Row/Row";
import SortBy from "../UI-elements/SortBy/SortBy";

const sortOptions = [
  { value: "rating-desc", label: "Sort by rating (descending)" },
  { value: "rating-asc", label: "Sort by rating (ascending)" },
  { value: "name-asc", label: "Sort by artist name (A-Z)" },
  { value: "name-desc", label: "Sort by artist name (Z-A)" },
];

function RatedArtistsOperations() {
  return (
    <OperationsContainer type="albums">
      <Row>
        <span className="title">Rated artists</span>
        <SortBy options={sortOptions} />
      </Row>
    </OperationsContainer>
  );
}

export default RatedArtistsOperations;
