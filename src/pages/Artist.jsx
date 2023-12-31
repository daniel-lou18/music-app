import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList/";
import TrackList from "../components/TrackList";
import { useMusic } from "../context/MusicContext";
import ArtistHeader from "../components/ArtistHeader";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/UI-elements/Spinner";
import ErrorMsg from "../components/ErrorMsg";

function Artist() {
  const {
    currentArtist: { tracks, artists, albums },
    isLoading,
    error,
    getArtist,
  } = useMusic();
  const { artistId } = useParams();

  useEffect(() => {
    getArtist(artistId);
  }, [artistId, getArtist]);

  if ((!tracks || !artists || !albums) && !isLoading) return null;

  return (
    <Results type="noPadding">
      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorMsg errorMsg={error} />}
      {!isLoading &&
        tracks.length === 0 &&
        artists.length === 0 &&
        albums.items.length === 0 && (
          <ListContainer>{`No results found`}</ListContainer>
        )}
      {!isLoading && !error && tracks.length > 0 && (
        <>
          <ListContainer>
            <ArtistHeader />
          </ListContainer>
          <ListContainer type="artistPage">
            <TrackList
              tracks={tracks.slice(0, 5)}
              title="Top Songs"
              type="big"
            />
          </ListContainer>
          <ListContainer type="artistPage">
            <HorizontalList
              items={artists.slice(0, 10)}
              title={"Related artists"}
            />
          </ListContainer>
          <ListContainer type="artistPage">
            <HorizontalList items={albums.items} title={"Albums"} />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default Artist;
