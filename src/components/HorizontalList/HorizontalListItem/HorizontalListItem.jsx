import styles from "./HorizontalListItem.module.css";
import Heart from "../../UI-elements/Heart";
import { useFavorites } from "../../../context/FavoritesContext";
import { useInterface } from "../../../context/InterfaceContext";
import { Link } from "react-router-dom";
import ImgPlaceholder from "../../UI-elements/ImgPlaceholder";
import GoToBtn from "../../UI-elements/GoToBtn";
import { useState } from "react";
import { useHandleFavorite } from "../../../hooks/useHandleFavorite";
import Alert from "../../Alert";
import { createPortal } from "react-dom";
import TrashIcon from "../../UI-elements/TrashIcon";
import useHandleToArtist from "../../../hooks/useHandleToArtist";

function HorizontalListItem({ id, imgUrl, title, subtitle, type, item }) {
  const [showAlert, setShowAlert] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { dispatch: dispatchInterface } = useInterface();
  const { favoritesData } = useFavorites();
  const favId = favoritesData.find((item) => item.id === id)?.id;

  const handleFavorite = useHandleFavorite(favId, item, setShowAlert);
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFavorite();
  };

  const handleFromAlbumToArtist = useHandleToArtist(
    item,
    item && item.artists && item.artists[0].id
  );
  const handleFromAlbumToArtistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFromAlbumToArtist();
  };

  const handleClick = () => {
    dispatchInterface({ type: "header/fixed/transparent" });
    window.scrollTo(0, 0);
  };

  return (
    <li className={styles.listItemWrapper}>
      {showAlert &&
        createPortal(
          <Alert
            icon={<TrashIcon height={20} width={20} />}
            text="Song succesfully removed from Favorites"
          />,
          document.body
        )}
      <Link
        className={styles.listItem}
        to={`/app/${type}/${id}`}
        onClick={handleClick}
      >
        {type === "artist" && (
          <Heart id={favId} onClick={handleFavoriteClick} type={type} />
        )}
        <div className={styles.imgWrapper}>
          <img
            src={imgUrl}
            className={`${styles.img} ${
              type === "artist" ? styles.circle : styles.square
            } ${imgLoaded ? "" : styles.imgLoading}`}
            alt={title}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && <ImgPlaceholder />}
          {type === "album" && imgLoaded && (
            <Heart id={favId} onClick={handleFavoriteClick} type={type} />
          )}
          <GoToBtn />
        </div>
        <div className={styles.textContainer}>
          <h3
            className={`${styles.title} ${
              type === "artist" ? styles.link : ""
            } ${title.length > 30 ? styles.titleSmall : ""}`}
          >
            {title.length > 30 ? title.slice(0, 30) + "..." : title}
          </h3>
          <h4
            className={`${styles.subtitle} ${
              type === "album" ? styles.link : ""
            }`}
            onClick={handleFromAlbumToArtistClick}
          >
            {subtitle}
          </h4>
        </div>
      </Link>
    </li>
  );
}

export default HorizontalListItem;
