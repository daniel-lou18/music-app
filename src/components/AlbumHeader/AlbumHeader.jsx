import StarRating from "../StarRating";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import styles from "./AlbumHeader.module.css";
import TopBar from "../Containers/TopBar";
import NavBtns from "../UI-elements/NavBtns/NavBtns";
import Heart from "../UI-elements/Heart";

function AlbumHeader({ title }) {
  const { topResult } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();

  if (!topResult || !topResult.artists)
    return (
      <div className={styles.resultContainer}>
        <h2 className={`section-title ${styles.title}`}>{title}</h2>
        <div className={styles.result}>{`No result found`}</div>
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
      <TopBar>
        <NavBtns />
      </TopBar>
      <div className={styles.result}>
        <div>
          <img
            className={styles.img}
            src={
              topResult.type === "track"
                ? topResult.album.images[0]?.url
                : topResult.images[0]?.url
            }
            alt={name}
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
              <h4>{topResult.release_date?.slice(0, 4)}</h4>
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
            <Heart id={favId} onClick={handleFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumHeader;
