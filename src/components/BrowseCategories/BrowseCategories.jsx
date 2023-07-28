import HorizontalList from "../HorizontalList";
import { categories, genres } from "../../../data/browseCategories";
import { useBrowse } from "../../context/BrowseContext";

function BrowseCategories() {
  const { data, genre } = useBrowse();
  const { artists } = data;

  return (
    <>
      {Object.keys(data).length !== 0 && (
        <HorizontalList items={artists.items} title={genre} />
      )}
      {Object.keys(data).length === 0 && categories.length > 0 && (
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
