import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import { useMusic } from "../context/MusicContext";
import AlbumHeader from "../components/AlbumHeader";

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
          <ListContainer type="albumPage">
            <AlbumHeader />
          </ListContainer>
          <ListContainer type="albumPage">
            <TrackList tracks={tracks?.items} title="Songs" type="big" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default Album;
