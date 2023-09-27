import PopularityIcon from "../UI-elements/PopularityIcon/";
import StarRating from "../StarRating/";
import { useMusic } from "../../context/MusicContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRated } from "../../context/RatedContext";
import styles from "./ArtistHeader.module.css";
import Heart from "../UI-elements/Heart";
import { useInterface } from "../../context/InterfaceContext";
import { useEffect, useRef, useState } from "react";
import { useHandleFavorite } from "../../hooks/useHandleFavorite";
import { createPortal } from "react-dom";
import Alert from "../Alert";
import TrashIcon from "../UI-elements/TrashIcon";

function ArtistHeader({ title }) {
  const [showAlert, setShowAlert] = useState(false);
  const { currentArtist } = useMusic();
  const { favoritesData } = useFavorites();
  const { ratedData, addRated, removeRated } = useRated();
  const { dispatch } = useInterface();
  const headerRef = useRef();

  const { id: spotifyId } = currentArtist;
  const favId = favoritesData.find((item) => item.id === spotifyId)?.id;
  const ratedItem = ratedData.find((item) => item.id === spotifyId);
  const handleFavorite = useHandleFavorite(favId, currentArtist, setShowAlert);

  const name = currentArtist.name;
  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          dispatch({ type: "header/fixed/transparent" });
        else dispatch({ type: "header/fixed/colored" });
      },
      { rootMargin: "-71px" }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  if (!currentArtist)
    return (
      <div className={styles.resultContainer}>
        <h2 className={`section-title ${styles.title}`}>{title}</h2>
        <div className={styles.result}>{`No result found`}</div>
      </div>
    );

  return (
    <div
      className={`${styles.resultContainer} ${styles.header}`}
      key={currentArtist.id}
    >
      {showAlert &&
        createPortal(
          <Alert
            icon={<TrashIcon height={20} width={20} />}
            text="Artist succesfully removed from Favorites"
          />,
          document.body
        )}
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
          <div className={styles.itemInfo} ref={headerRef}>
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
