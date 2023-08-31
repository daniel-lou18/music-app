import PopularityIcon from "../UI-elements/PopularityIcon/";
import styles from "./TopResult.module.css";
import PlayBtn from "../UI-elements/PlayBtn/PlayBtn";
import StarRating from "../StarRating/";
import Heart from "../UI-elements/Heart";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import { artist } from "../../../data/featuredArtist";

import { useEffect } from "react";

function TopResult({ title, type = "result" }) {
  const { query, topResult, dispatch } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();
  console.log(topResult);

  useEffect(() => {
    if (type === "featured") {
      dispatch({ type: "topResult/set", payload: artist });
    }
  }, [type, dispatch]);

  if (!topResult)
    return (
      <div className={styles.resultContainer}>
        <h2 className={`section-title ${styles.title}`}>{title}</h2>
        <div
          className={styles.result}
        >{`No Top Result found for "${query}"`}</div>
      </div>
    );

  const { id: spotifyId } = topResult;
  const favId = favoritesData.find((item) => item.id === spotifyId)?.id;
  const ratedItem = ratedData.find((item) => item.id === spotifyId);

  const handleFavorite = () => {
    console.log(favoritesData);
    console.log(favId);
    if (!favId) {
      addFavorite(topResult);
    } else {
      removeFavorite(favId);
    }
  };

  return (
    <div className={`${styles.resultContainer}`} key={topResult.id}>
      <h2 className={`section-title ${styles.title}`}>{title}</h2>
      <div className={styles.result}>
        <Heart id={favId} onClick={handleFavorite} />
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
        <div className={styles.itemSubtitles}>
          <h3
            className={`${styles.firstSubtitle} small-subtext ${
              topResult.type === "artist" && topResult.genres.length === 0
                ? styles.firstSubtitleHidden
                : ""
            } `}
          >
            {topResult.type === "track" || topResult.type === "album"
              ? topResult.artists[0]?.name
              : topResult.genres[0]}
          </h3>
          <h4 className={`${styles.secondSubtitle}`}>
            {topResult.type === "track"
              ? "Song"
              : topResult.type.slice(0, 1).toUpperCase() +
                topResult.type.slice(1)}
          </h4>
        </div>
        <PopularityIcon
          popularity={
            topResult.type === "album"
              ? 3
              : Math.ceil(topResult.popularity / 20)
          }
        />
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
    </div>
  );
}

export default TopResult;
