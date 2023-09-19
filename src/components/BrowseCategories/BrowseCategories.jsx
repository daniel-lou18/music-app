import HorizontalList from "../HorizontalList";
import { categories, genres } from "../../../data/browseCategories";
import Results from "../Containers/Results";
import ListContainer from "../Containers/ListContainer";

function BrowseCategories() {
  return (
    <Results>
      <ListContainer>
        <HorizontalList
          items={categories}
          title="Browse genres"
          type="browse"
          genreNames={genres}
          className="browse-categories"
        />
      </ListContainer>
    </Results>
  );
}

export default BrowseCategories;
