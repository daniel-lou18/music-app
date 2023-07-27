import SearchBar from "../components/SearchBar";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList/";
import TrackList from "../components/TrackList";
import TopResult from "../components/TopResult";
import { useMusic } from "../context/MusicContext";
import { BrowseProvider } from "../context/BrowseContext";
import BrowseCategories from "../components/BrowseCategories";

function Search() {
  const { data, query, isLoading, error, dispatch } = useMusic();
  const { tracks, artists, albums } = data;

  return (
    <>
      <SearchBar
        query={query}
        onQuery={(e) =>
          dispatch({ type: "search/query", payload: e.target.value })
        }
      />
      {(!query || !query.trim() || Object.keys(data).length === 0) && (
        <BrowseProvider>
          <BrowseCategories />
        </BrowseProvider>
      )}
      {query && (
        <Results>
          {isLoading && <div>Loading...</div>}
          {!isLoading && error && <div>{error}</div>}
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
              <ListContainer position="right">
                <TrackList tracks={tracks?.items} title="Songs" />
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
    </>
  );
}

export default Search;
