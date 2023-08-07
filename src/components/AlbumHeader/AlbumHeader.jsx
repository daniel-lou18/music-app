/* eslint-disable react/prop-types */
import StarRating from "../StarRating";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import styles from "./AlbumHeader.module.css";

function AlbumHeader({ title }) {
  const { query, topResult } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();
  console.log(topResult);

  if (!topResult || !topResult.artists)
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

  const name =
    topResult.name.slice(0, 1).toUpperCase() +
    topResult.name.slice(1).toLowerCase();

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
              name.length > 15 ? styles.itemTitleSmall : ""
            }`}
          >
            {name.length > 30 ? name.slice(0, 25) + "..." : name}
          </h3>
          <div className={styles.itemInfo}>
            <div className={styles.secondSubtitleWrapper}>
              <h4 className={`${styles.secondSubtitle}`}>
                {topResult.type === "track"
                  ? "Song"
                  : topResult.type.slice(0, 1).toUpperCase() +
                    topResult.type.slice(1)}
              </h4>
            </div>
            <div className={styles.albumInfo}>
              <h4>{topResult.artists[0]?.name}</h4>
              <h4>{topResult.release_date.slice(0, 4)}</h4>
              <h4>{topResult.total_tracks} tracks</h4>
            </div>
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

export default AlbumHeader;
