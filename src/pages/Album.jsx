import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import { useMusic } from "../context/MusicContext";

function Album() {
  const { data, isLoading, error } = useMusic();
  const { tracks, artists, albums } = data;

  return (
    <Results>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>{error}</div>}
      {!isLoading &&
        tracks?.items.length === 0 &&
        artists?.items.length === 0 &&
        albums?.items.length === 0 && (
          <ListContainer>{`No results found`}</ListContainer>
        )}
      {!isLoading && !error && tracks?.items.length > 0 && (
        <>
          <ListContainer>
            <TrackList tracks={tracks?.items} title="Top Songs" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default Album;
