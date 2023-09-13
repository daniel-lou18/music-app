import PopularityIcon from "../UI-elements/PopularityIcon/";
import StarRating from "../StarRating/";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import styles from "./ArtistHeader.module.css";
import TopBar from "../Containers/TopBar";
import NavBtns from "../UI-elements/NavBtns";
import Heart from "../UI-elements/Heart";

function ArtistHeader({ title }) {
  const { currentArtist } = useMusic();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();

  if (!currentArtist)
    return (
      <div className={styles.resultContainer}>
        <h2 className={`section-title ${styles.title}`}>{title}</h2>
        <div className={styles.result}>{`No result found`}</div>
      </div>
    );

  const { id: spotifyId } = currentArtist;
  const favId = favoritesData.find((item) => item.id === spotifyId)?.id;
  const ratedItem = ratedData.find((item) => item.id === spotifyId);

  const name = currentArtist.name;

  const handleFavorite = () => {
    if (!favId) {
      addFavorite(currentArtist);
    } else {
      removeFavorite(favId);
    }
  };

  return (
    <div
      className={`${styles.resultContainer} ${styles.header}`}
      key={currentArtist.id}
    >
      <TopBar>
        <NavBtns />
      </TopBar>
      <div className={styles.result}>
        <div>
          <img
            className={styles.img}
            src={currentArtist.images[0]?.url}
            alt={name}
          />
        </div>
        <div className={styles.itemText}>
          <h3
            className={`${styles.itemTitle} ${
              name.length > 15 ? styles.itemTitleSmall : ""
            }`}
          >
            {name.length > 30 ? name.slice(0, 30) + "..." : name}
          </h3>
          <div className={styles.itemInfo}>
            <div className={styles.secondSubtitleWrapper}>
              <h4 className={`${styles.secondSubtitle}`}>
                {currentArtist.type.slice(0, 1).toUpperCase() +
                  currentArtist.type.slice(1)}
              </h4>
            </div>
            <PopularityIcon
              popularity={Math.ceil(currentArtist.popularity / 20)}
              type="header"
            />
            <StarRating
              size={24}
              color="yellow"
              text="Rating"
              number={5}
              callback={addRated}
              beforeCallback={ratedItem ? removeRated : null}
              item={currentArtist}
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

export default ArtistHeader;
