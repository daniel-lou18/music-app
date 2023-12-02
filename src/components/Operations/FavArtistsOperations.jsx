import OperationsContainer from "../Containers/OperationsContainer";
import Row from "../UI-elements/Row/Row";
import SortBy from "../UI-elements/SortBy/SortBy";

const sortOptions = [
  { value: "name-asc", label: "Sort by artist name (A-Z)" },
  { value: "name-desc", label: "Sort by artist name (Z-A)" },
];

function FavoriteArtistsOperations() {
  return (
    <OperationsContainer type="albums">
      <Row>
        <span className="title">Favorite artists</span>
        <SortBy options={sortOptions} />
      </Row>
    </OperationsContainer>
  );
}

export default FavoriteArtistsOperations;
