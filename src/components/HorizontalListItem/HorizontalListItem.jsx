// eslint-disable-next-line no-unused-vars
import styles from "./HorizontalListItem.module.css";
import PlayBtn from "../UI-elements/PlayBtn/";
import Heart from "../UI-elements/Heart";
import { useFavorites } from "../../context/FavoritesContext";

import { useNavigate } from "react-router-dom";
import { useMusic } from "../../context/MusicContext";
import { useBrowse } from "../../context/BrowseContext";
import ImgPlaceholder from "../UI-elements/ImgPlaceholder/ImgPlaceholder";

function HorizontalListItem({
  id,
  imgUrl,
  title,
  subtitle,
  type,
  genreName,
  itemName,
  extended,
  item,
}) {
  const navigate = useNavigate();

  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const favId = favoritesData.find((item) => item.id === id)?.id;
  const { dispatch } = useMusic();
  const { dispatch: dispatchBrowse } = useBrowse();

  const handleFavorite = () => {
    console.log(favoritesData);
    console.log(favId);
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

  const handleBrowse = () => {
    dispatchBrowse({ type: "browse/genre", payload: genreName });
    navigate(`/app/browse/${genreName}`);

    window.scrollTo(0, 0);
  };

  const handleNoHoverNavigate = function () {
    const regexMobile =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (!regexMobile.test(navigator.userAgent)) return;

    if (!extended) return handleBrowse();

    handleFromArtistNavigate();
    if (type === "album") {
      dispatch({ type: "album/get", payload: id });
      navigate(`/app/album/${id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <li className={styles.listItem} onClick={handleNoHoverNavigate}>
      {type === "artist" && extended && (
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
        {type === "album" && extended && (
          <Heart id={favId} onClick={handleFavorite} type={type} />
        )}
      </div>
      <div className={styles.textContainer}>
        <h3
          className={`${styles.title} ${
            type === "artist" && extended ? styles.link : ""
          }`}
          onClick={handleFromArtistNavigate}
        >
          {title}
        </h3>
        <h4
          className={`${styles.subtitle} ${
            type === "album" && extended ? styles.link : ""
          }`}
          onClick={handleFromAlbumNavigate}
        >
          {subtitle}
        </h4>
        <PlayBtn
          type={type}
          id={id}
          genreName={genreName}
          itemName={itemName}
        />
      </div>
    </li>
  );
}

export default HorizontalListItem;
