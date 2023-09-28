import PopularityIcon from "../UI-elements/PopularityIcon/";
import styles from "./TopResult.module.css";
import PlayBtn from "../UI-elements/PlayBtn";
import StarRating from "../StarRating/";
import Heart from "../UI-elements/Heart";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import { artist } from "../../../data/featuredArtist";
import Subtitles from "./Subtitles";
import ErrorMsg from "../ErrorMsg";

import { useEffect, useRef, useState } from "react";
import ReleaseDate from "./ReleaseDate/ReleaseDate";
import { useInterface } from "../../context/InterfaceContext";
import useHandleToArtist from "../../hooks/useHandleToArtist";
import { useHandleFavorite } from "../../hooks/useHandleFavorite";
import { createPortal } from "react-dom";
import Alert from "../Alert";
import TrashIcon from "../UI-elements/TrashIcon";
import useHandleToAlbum from "../../hooks/useHandleToAlbum";
import useHandlePause from "../../hooks/useHandlePause";
import useHandlePlay from "../../hooks/useHandlePlay";
import useLockedMessage from "../../hooks/useLockedMessage";

function TopResult({
  title,
  type = "result",
  isLoading,
  error,
  first = false,
}) {
  const [showAlertFavorites, setShowAlertFavorites] = useState(false);
  const [showAlertLocked, setShowAlertLocked] = useState(false);
  const { query, topResult, dispatch, isPlayingId } = useMusic();
  const { favoritesData } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();
  const { dispatch: dispatchInterface } = useInterface();
  const headerRef = useRef();
  const { id: spotifyId } = topResult || {};
  const favId = favoritesData.find((item) => item.id === spotifyId)?.id;
  const ratedItem = ratedData.find((item) => item.id === spotifyId);

  const handleFavorite = useHandleFavorite(
    favId,
    topResult,
    setShowAlertFavorites
  );
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    handleFavorite();
  };
  const handleFromArtistToArtist = useHandleToArtist(topResult, spotifyId);
  const handleFromAlbumToAlbum = useHandleToAlbum(topResult, spotifyId);
  const handlePause = useHandlePause(topResult, isPlayingId, spotifyId);
  const handlePlay = useHandlePlay(topResult, isPlayingId, spotifyId);
  const handleLocked = useLockedMessage(topResult, setShowAlertLocked);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          dispatchInterface({ type: "header/fixed/transparent" });
        else dispatchInterface({ type: "header/fixed/colored" });
      },
      { rootMargin: "-71px" }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [dispatchInterface]);

  useEffect(() => {
    if (type === "featured") {
      dispatch({ type: "topResult/set", payload: artist });
    }
  }, [type, dispatch]);

  if (!topResult)
    return (
      <div className={`result-container ${styles.resultContainer}`}>
        <h2 className={`section-title ${styles.title}`}>{title}</h2>
        <div className={styles.result}>
          <ErrorMsg
            errorMsg={`No Top Result found for "${query}"`}
            errorTip="Please check if everything is spelled correctly"
            displayButton={false}
          />
        </div>
      </div>
    );

  const handleClick = () => {
    if (!topResult?.preview_url) handleLocked();
    if (topResult?.type === "track") handlePlay();
    if (topResult?.type === "track") handlePause();
    if (topResult?.type === "album") handleFromAlbumToAlbum();
    if (topResult?.type === "artist") handleFromArtistToArtist();
  };

  return (
    <div
      className={`result-container ${styles.resultContainer}`}
      key={topResult.id}
      onClick={handleClick}
    >
      {showAlertFavorites &&
        createPortal(
          <Alert
            icon={<TrashIcon height={20} width={20} />}
            text="Song succesfully removed from Favorites"
          />,
          document.body
        )}
      {showAlertLocked &&
        createPortal(
          <Alert
            icon={<TrashIcon height={20} width={20} />}
            text="You need a premium account to play this song"
          />,
          document.body
        )}
      <h2
        ref={first ? headerRef : null}
        className={`section-title ${styles.title}`}
      >
        {title}
      </h2>
      <div className={styles.result}>
        {!isLoading && error && <ErrorMsg errorMsg={error} />}
        {!isLoading && !error && (
          <>
            <Heart id={favId} onClick={handleFavoriteClick} type="album" />
            <img
              className={styles.img}
              src={
                topResult.type === "track"
                  ? topResult.album.images[0]?.url
                  : topResult.images[0]?.url
              }
              alt={topResult.name}
            />
            <h3
              className={`${styles.itemTitle} ${
                topResult.name.length > 20 ? styles.itemTitleSmall : ""
              }`}
            >
              {topResult.name.length > 30
                ? topResult.name.slice(0, 30) + "..."
                : topResult.name}
            </h3>
            <Subtitles topResult={topResult} />
            {topResult.type === "album" ? (
              <ReleaseDate releaseDate={topResult.release_date} />
            ) : (
              <PopularityIcon
                popularity={Math.ceil(topResult.popularity / 20)}
              />
            )}
            <PlayBtn
              key={topResult.id}
              type={topResult.type}
              id={topResult.id}
              previewUrl={topResult.preview_url}
            />
            <StarRating
              size={24}
              color="yellow"
              text="Rating"
              number={5}
              callback={addRated}
              beforeCallback={ratedItem ? removeRated : null}
              item={topResult}
              defaultRating={ratedItem ? ratedItem.rating : 0}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TopResult;
