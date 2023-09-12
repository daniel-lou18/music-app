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
  const { currentArtist, isLoading, error, getArtist } = useMusic();
  const { tracks, artists, albums } = currentArtist;
  const { artistId } = useParams();
  console.log(currentArtist);

  useEffect(() => {
    getArtist(artistId);
  }, [artistId]);

  // useEffect(() => {
  //   if (!artistId) dispatch({ type: "artist/get", payload: id });
  // }, [artistId, id, dispatch]);
  if (!tracks || !artists || !albums) return null;

  return (
    <Results>
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
            <TrackList tracks={tracks} title="Top Songs" type="big" />
          </ListContainer>
          <ListContainer type="artistPage">
            <HorizontalList items={artists} title={"Related artists"} />
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
