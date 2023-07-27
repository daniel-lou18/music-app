/* eslint-disable react/prop-types */
import PopularityIcon from "../UI-elements/PopularityIcon/";
import styles from "./TopResult.module.css";
import PlayBtn from "../UI-elements/PlayBtn/PlayBtn";
import StarRating from "../StarRating/";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";

function TopResult() {
  const { topResult } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();

  if (!topResult) return <div>No results...</div>;

  const { id: spotifyId } = topResult;
  const id = favoritesData.find((item) => item.id === spotifyId)?.id;

  const handleClick = () => {
    console.log(favoritesData);
    console.log(id);
    if (!id) {
      addFavorite(topResult);
    } else {
      removeFavorite(id);
    }
  };

  return (
    <div className={styles.resultContainer}>
      <h2 className={`section-title ${styles.title}`}>Top Result</h2>
      <div className={styles.result}>
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={id ? "red" : "none"}
          stroke={id ? "none" : "darkgrey"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`feather feather-heart ${id ? styles.redHeart : ""}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <img
          className={styles.img}
          src={
            topResult.type === "track"
              ? topResult.album.images[0]?.url
              : topResult.images[0]?.url
          }
        />
        <h3
          className={`${styles.itemTitle} ${
            topResult.name.length > 30 ? styles.itemTitleSmall : ""
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
        <PlayBtn key={topResult.id} type={topResult.type} id={topResult.id} />
        <StarRating size={24} color="yellow" text="Rating" number={5} />
      </div>
    </div>
  );
}

export default TopResult;
