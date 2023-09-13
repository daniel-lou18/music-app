import styles from "./HorizontalListItem.module.css";
import Heart from "../../UI-elements/Heart";
import { useFavorites } from "../../../context/FavoritesContext";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ImgPlaceholder from "../../UI-elements/ImgPlaceholder/ImgPlaceholder";
import GoToBtn from "../../UI-elements/GoToBtn";

function HorizontalListItem({ id, imgUrl, title, subtitle, type, item }) {
  const navigate = useNavigate();
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const favId = favoritesData.find((item) => item.id === id)?.id;

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!favId) {
      addFavorite(item);
    } else {
      removeFavorite(favId);
    }
  };

  const handleFromAlbumToArtist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "album") {
      navigate(`/app/artist/${item.artists[0].id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <li className={styles.listItemWrapper}>
      <Link className={styles.listItem} to={`/app/${type}/${id}`}>
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
          <GoToBtn />
        </div>
        <div className={styles.textContainer}>
          <h3
            className={`${styles.title} ${
              type === "artist" ? styles.link : ""
            }`}
          >
            {title.length > 30 ? title.slice(0, 35) + "..." : title}
          </h3>
          <h4
            className={`${styles.subtitle} ${
              type === "album" ? styles.link : ""
            }`}
            onClick={handleFromAlbumToArtist}
          >
            {subtitle}
          </h4>
        </div>
      </Link>
    </li>
  );
}

export default HorizontalListItem;
