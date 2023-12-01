import OperationsContainer from "../Containers/OperationsContainer/OperationsContainer";
import Filter from "../UI-elements/Filter/Filter";
import Row from "../UI-elements/Row/Row";
import SortBy from "../UI-elements/SortBy/SortBy";

const filterOptions = [
  { value: "all", label: "All songs" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const sortOptions = [
  { value: "name-asc", label: "Sort by song name (A-Z)" },
  { value: "name-desc", label: "Sort by song name (Z-A)" },
  { value: "artist-asc", label: "Sort by artist name (A-Z)" },
  { value: "artist-desc", label: "Sort by artist name (Z-A)" },
];

function FavSongsOperations() {
  return (
    <OperationsContainer>
      <Row>
        <span className="title">Favorite songs</span>
        <Filter fieldName="subscription" options={filterOptions} />
        <SortBy options={sortOptions} />
      </Row>
    </OperationsContainer>
  );
}

export default FavSongsOperations;
