import SearchBar from "../components/SearchBar";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList/";
import TrackList from "../components/TrackList";
import TopResult from "../components/TopResult";
import { useMusic } from "../context/MusicContext";
import BrowseCategories from "../components/BrowseCategories";
import { useBrowse } from "../context/BrowseContext";
import Spinner from "../components/UI-elements/Spinner";
import ErrorMsg from "../components/ErrorMsg";

function Search() {
  const { data, query, isLoading, error, dispatch, artistId, albumId } =
    useMusic();
  const { dispatch: dispatchBrowse } = useBrowse();
  const { tracks, artists, albums } = data;

  const handleQuery = (e) => {
    dispatch({ type: "search/query", payload: e.target.value });
    dispatchBrowse({ type: "reset" });
  };

  return (
    <>
      <SearchBar query={query} onQuery={handleQuery} />
      {(query || artistId || albumId) && (
        <Results>
          {isLoading && <Spinner />}
          {!isLoading && error && <ErrorMsg errorMsg={error} />}
          {!isLoading &&
            tracks?.items.length === 0 &&
            artists?.items.length === 0 &&
            albums?.items.length === 0 && (
              <ListContainer>{`No results found for "${query}"`}</ListContainer>
            )}
          {!isLoading && !error && tracks?.items.length > 0 && (
            <>
              <ListContainer position="left">
                <TopResult title="Top Result" />
              </ListContainer>
              <ListContainer
                position="right"
                className="search-container-tracks"
              >
                <TrackList tracks={tracks?.items.slice(0, 5)} title="Songs" />
              </ListContainer>
              <ListContainer>
                <HorizontalList items={artists?.items} title={"Artists"} />
              </ListContainer>
              <ListContainer>
                <HorizontalList items={albums?.items} title={"Albums"} />
              </ListContainer>
            </>
          )}
        </Results>
      )}
      {(!query || !query.trim() || Object.keys(data).length === 0) &&
        !isLoading &&
        !artistId &&
        !albumId && <BrowseCategories />}
    </>
  );
}

export default Search;
