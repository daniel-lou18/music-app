import HorizontalList from "../components/HorizontalList";
import { useBrowse } from "../context/BrowseContext";
import TopBar from "../components/Containers/TopBar";
import NavBtns from "../components/UI-elements/NavBtns";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Browse() {
  const { data, genre, dispatch, isLoading } = useBrowse();
  const { artists } = data;
  const { genre: genreUrl } = useParams();

  useEffect(() => {
    if (!genre) dispatch({ type: "browse/genre", payload: genreUrl });
  }, [genre, dispatch, genreUrl]);

  return (
    <>
      <TopBar>
        <NavBtns />
      </TopBar>
      {isLoading && <div>Loading...</div>}
      {!isLoading && Object.keys(data).length !== 0 && (
        <HorizontalList
          items={artists.items}
          title={genre[0].toUpperCase() + genre.slice(1)}
        />
      )}
    </>
  );
}

export default Browse;
