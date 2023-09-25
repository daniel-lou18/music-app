import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList/";
import TrackList from "../components/TrackList";
import TopResult from "../components/TopResult";
import { useMusic } from "../context/MusicContext";
import BrowseCategories from "../components/BrowseCategories";
import Spinner from "../components/UI-elements/Spinner";

function Search() {
  const { data, query, isLoading, error, artistId, albumId } = useMusic();
  const { tracks, artists, albums } = data;

  return (
    <>
      {(query || artistId || albumId) && (
        <Results>
          {isLoading && <Spinner />}
          {!isLoading &&
            tracks?.items.length === 0 &&
            artists?.items.length === 0 &&
            albums?.items.length === 0 && (
              <ListContainer>{`No results found for "${query}"`}</ListContainer>
            )}
          {!isLoading && (
            <>
              <ListContainer position="left">
                <TopResult
                  title="Top Result"
                  isLoading={isLoading}
                  error={error}
                  first={true}
                />
              </ListContainer>
              <ListContainer
                position="right"
                className="search-container-tracks"
              >
                <TrackList
                  tracks={tracks?.items.slice(0, 5)}
                  title="Songs"
                  isLoading={isLoading}
                  error={error}
                />
              </ListContainer>
              <ListContainer>
                <HorizontalList
                  items={artists?.items}
                  title="Artists"
                  isLoading={isLoading}
                  error={error}
                />
              </ListContainer>
              <ListContainer>
                <HorizontalList
                  items={albums?.items}
                  title="Albums"
                  isLoading={isLoading}
                  error={error}
                />
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
