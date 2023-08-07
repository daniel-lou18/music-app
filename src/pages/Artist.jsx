import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList/";
import TrackList from "../components/TrackList";
import { useMusic } from "../context/MusicContext";
import ArtistHeader from "../components/ArtistHeader";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Artist() {
  const { data, isLoading, error, artistId, dispatch } = useMusic();
  const { tracks, artists, albums } = data;
  const { artistId: id } = useParams();

  useEffect(() => {
    if (!artistId) dispatch({ type: "artist/get", payload: id });
  }, [artistId, id, dispatch]);

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
            <ArtistHeader />
          </ListContainer>
          <ListContainer type="artistPage">
            <TrackList tracks={tracks?.items} title="Top Songs" />
          </ListContainer>
          <ListContainer type="artistPage">
            <HorizontalList items={artists?.items} title={"Related artists"} />
          </ListContainer>
          <ListContainer type="artistPage">
            <HorizontalList items={albums?.items} title={"Albums"} />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default Artist;
