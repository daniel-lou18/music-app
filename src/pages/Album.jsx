import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import AlbumTrackList from "../components/AlbumTrackList";
import { useMusic } from "../context/MusicContext";
import AlbumHeader from "../components/AlbumHeader";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../components/UI-elements/Spinner";
import ErrorMsg from "../components/ErrorMsg";

function Album() {
  const { currentAlbum, isLoading, error, getAlbum } = useMusic();
  const trackItems = currentAlbum?.tracks?.items;
  const { albumId } = useParams();

  // console.log(currentAlbum);
  useEffect(() => {
    getAlbum(albumId);
  }, [albumId]);

  if (!trackItems || trackItems.length < 1) return null;

  return (
    <>
      <Results type="noPadding">
        {isLoading && <Spinner />}
        {!isLoading && error && <ErrorMsg errorMsg={error} />}
        {!isLoading && !error && (
          <>
            <ListContainer type="albumPage">
              <AlbumHeader />
            </ListContainer>
            <ListContainer type="albumPage">
              <AlbumTrackList title="Songs" type="big" />
            </ListContainer>
          </>
        )}
      </Results>
    </>
  );
}

export default Album;
