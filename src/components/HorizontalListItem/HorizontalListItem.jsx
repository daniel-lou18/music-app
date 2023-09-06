import styles from "./HorizontalListItem.module.css";
import Heart from "../UI-elements/Heart";
import { useFavorites } from "../../context/FavoritesContext";

import { useNavigate } from "react-router-dom";
import { useMusic } from "../../context/MusicContext";
import ImgPlaceholder from "../UI-elements/ImgPlaceholder/ImgPlaceholder";
import GoToBtn from "../UI-elements/GoToBtn";

function HorizontalListItem({ id, imgUrl, title, subtitle, type, item }) {
  const navigate = useNavigate();

  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const favId = favoritesData.find((item) => item.id === id)?.id;
  const { dispatch } = useMusic();

  const handleFavorite = () => {
    console.log(favoritesData);
    if (!favId) {
      addFavorite(item);
    } else {
      removeFavorite(favId);
    }
  };

  const handleFromArtistNavigate = function () {
    if (type === "artist") {
      dispatch({ type: "artist/get", payload: id });
      navigate(`/app/artist/${id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleFromAlbumNavigate = function () {
    if (type === "album") {
      dispatch({ type: "artist/get", payload: item.artists[0].id });
      navigate(`/app/artist/${item.artists[0].id}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNoHoverNavigate = function () {
    const regexMobile =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (!regexMobile.test(navigator.userAgent)) return;

    handleFromArtistNavigate();
    if (type === "album") {
      dispatch({ type: "album/get", payload: id });
      navigate(`/app/album/${id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <li className={styles.listItemWrapper}>
      <button className={styles.listItem} onClick={handleNoHoverNavigate}>
        {type === "artist" && (
          <Heart id={favId} onClick={handleFavorite} type={type} />
        )}
        <div className={styles.imgWrapper}>
          {imgUrl && (
            <img
              src={imgUrl}
              className={`${styles.img} ${
                type === "artist" ? styles.circle : styles.square
              }`}
              alt={title}
            />
          )}
          {!imgUrl && <ImgPlaceholder />}
          {type === "album" && (
            <Heart id={favId} onClick={handleFavorite} type={type} />
          )}
        </div>
        <div className={styles.textContainer}>
          <h3
            className={`${styles.title} ${
              type === "artist" ? styles.link : ""
            }`}
            onClick={handleFromArtistNavigate}
          >
            {title}
          </h3>
          <h4
            className={`${styles.subtitle} ${
              type === "album" ? styles.link : ""
            }`}
            onClick={handleFromAlbumNavigate}
          >
            {subtitle}
          </h4>
          <GoToBtn type={type} id={id} />
        </div>
      </button>
    </li>
  );
}

export default HorizontalListItem;
