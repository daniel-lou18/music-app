/* eslint-disable react/prop-types */
import PopularityIcon from "../UI-elements/PopularityIcon/";
import StarRating from "../StarRating/";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import styles from "./ArtistHeader.module.css";

function ArtistHeader({ title }) {
  const { query, topResult } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();
  console.log(topResult);

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
    <div
      className={`${styles.resultContainer} ${styles.header}`}
      key={topResult.id}
    >
      <div className={styles.result}>
        <svg
          onClick={handleFavorite}
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={favId ? "red" : "none"}
          stroke={favId ? "none" : "darkgrey"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`feather feather-heart ${favId ? styles.redHeart : ""}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <div>
          <img
            className={styles.img}
            src={
              topResult.type === "track"
                ? topResult.album.images[0]?.url
                : topResult.images[0]?.url
            }
          />
        </div>
        <div className={styles.itemText}>
          <h3
            className={`${styles.itemTitle} ${
              topResult.name.length > 20 ? styles.itemTitleSmall : ""
            }`}
          >
            {topResult.name.length > 30
              ? topResult.name.slice(0, 30) + "..."
              : topResult.name}
          </h3>
          <div className={styles.itemInfo}>
            <PopularityIcon
              popularity={
                topResult.type === "album"
                  ? 3
                  : Math.ceil(topResult.popularity / 20)
              }
              type="header"
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
              type="header"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistHeader;
