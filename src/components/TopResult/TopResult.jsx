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

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReleaseDate from "./ReleaseDate/ReleaseDate";
import Spinner from "../UI-elements/Spinner";
import { useInterface } from "../../context/InterfaceContext";

function TopResult({
  title,
  type = "result",
  isLoading,
  error,
  first = false,
}) {
  const navigate = useNavigate();
  const { query, topResult, dispatch, isPlayingId } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();
  const { dispatch: dispatchInterface } = useInterface();
  const headerRef = useRef();

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
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
          <ErrorMsg errorMsg={`No Top Result found for "${query}"`} />
        </div>
      </div>
    );

  const { id: spotifyId } = topResult;
  const favId = favoritesData.find((item) => item.id === spotifyId)?.id;
  const ratedItem = ratedData.find((item) => item.id === spotifyId);

  const handlePlay = () => {
    if (
      topResult.type === "track" &&
      topResult.preview_url &&
      isPlayingId !== spotifyId
    )
      dispatch({ type: "playing/set", payload: spotifyId });
  };

  const handlePause = () => {
    if (
      topResult.type === "track" &&
      topResult.preview_url &&
      isPlayingId === spotifyId
    )
      dispatch({ type: "playing/set", payload: "" });
  };

  const handleFromArtistToArtist = () => {
    if (topResult.type === "artist") {
      navigate(`/app/artist/${spotifyId}`);
      window.scrollTo(0, 0);
    }
  };

  const handleFromAlbumToAlbum = () => {
    if (topResult.type === "album") {
      navigate(`/app/album/${spotifyId}`);
      window.scrollTo(0, 0);
    }
  };

  const handleClick = () => {
    handlePlay();
    handlePause();
    handleFromAlbumToAlbum();
    handleFromArtistToArtist();
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!favId) {
      addFavorite(topResult);
    } else {
      removeFavorite(favId);
    }
  };

  return (
    <div
      className={`result-container ${styles.resultContainer}`}
      key={topResult.id}
      onClick={handleClick}
    >
      <h2
        ref={first ? headerRef : null}
        className={`section-title ${styles.title}`}
      >
        {title}
      </h2>
      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorMsg errorMsg={error} />}
      {!isLoading && !error && (
        <div className={styles.result}>
          <Heart id={favId} onClick={handleFavorite} type="album" />
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
            <PopularityIcon popularity={Math.ceil(topResult.popularity / 20)} />
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
        </div>
      )}
    </div>
  );
}

export default TopResult;
