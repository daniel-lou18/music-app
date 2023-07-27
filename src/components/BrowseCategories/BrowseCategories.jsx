import HorizontalList from "../HorizontalList";
import { categories, genres } from "../../../data/browseCategories";

function BrowseCategories() {
  return (
    <>
      {categories.length > 0 && (
        <HorizontalList
          items={categories}
          title="Browse genres"
          type="browse"
          genreNames={genres}
        />
      )}
    </>
  );
}

export default BrowseCategories;
