import Results from "../components/Containers/Results";
import ListContainerDynamic from "../components/Containers/ListContainer/ListContainerDynamic";
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
            <ListContainerDynamic type="albumPage">
              <AlbumHeader />
            </ListContainerDynamic>
            <ListContainerDynamic type="albumPage">
              <AlbumTrackList title="Songs" type="big" />
            </ListContainerDynamic>
          </>
        )}
      </Results>
    </>
  );
}

export default Album;
