/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import styles from "./HorizontalListItem.module.css";
import PlayBtn from "../UI-elements/PlayBtn/";
import Heart from "../UI-elements/Heart";
import { useFavorites } from "../../context/FavoritesContext";

import { useNavigate } from "react-router-dom";
import { useMusic } from "../../context/MusicContext";

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

  return (
    <li className={styles.listItem}>
      {type === "artist" && extended === true && (
        <Heart id={favId} onClick={handleFavorite} type={type} />
      )}
      <div className={styles.imgWrapper}>
        <img
          src={imgUrl}
          className={`${styles.img} ${
            type === "artist" ? styles.circle : styles.square
          }`}
        />
        {type === "album" && extended === true && (
          <Heart id={favId} onClick={handleFavorite} type={type} />
        )}
      </div>
      <div className={styles.textContainer}>
        <h3
          className={`${styles.title} ${
            type === "artist" && extended === true ? styles.link : ""
          }`}
          onClick={handleFromArtistNavigate}
        >
          {title}
        </h3>
        <h4
          className={`${styles.subtitle} ${
            type === "album" && extended === true ? styles.link : ""
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
