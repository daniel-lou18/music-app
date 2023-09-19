import HorizontalList from "../components/HorizontalList";
import { useBrowse } from "../context/BrowseContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/UI-elements/Spinner";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";

function Browse() {
  const { data, genre, dispatch, isLoading } = useBrowse();
  const { artists } = data;
  const { genre: genreUrl } = useParams();

  useEffect(() => {
    if (!genre) dispatch({ type: "browse/genre", payload: genreUrl });
  }, [genre, dispatch, genreUrl]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && Object.keys(data).length !== 0 && (
        <Results>
          <ListContainer>
            <HorizontalList
              items={artists.items}
              title={genre[0].toUpperCase() + genre.slice(1)}
              className="browse-category"
            />
          </ListContainer>
        </Results>
      )}
    </>
  );
}

export default Browse;
