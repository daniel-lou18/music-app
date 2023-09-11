import styles from "./RatedListItem.module.css";
import { useRated } from "../../../context/RatedContext";
import StarRating from "../../StarRating";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "../../../context/MusicContext";
import GoToBtn from "../../UI-elements/GoToBtn";

function RatedListItem({ id, imgUrl, title, type, itemName, item }) {
  const navigate = useNavigate();
  const { dispatch } = useMusic();

  const { ratedData, addRated, removeRated } = useRated();
  const ratedItem = ratedData.find((item) => item.id === id);
  const [showReset, setShowReset] = useState(false);

  const handleFromArtistNavigate = function () {
    if (type === "artist") {
      dispatch({ type: "artist/get", payload: id });
      navigate(`/app/artist/${id}`);
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
    <li
      className={`${styles.listItemWrapper} ${
        showReset ? styles.showReset : ""
      }`}
    >
      <button className={styles.listItem} onClick={handleNoHoverNavigate}>
        <div className={styles.imgWrapper}>
          <img
            src={imgUrl}
            className={`${styles.img} ${
              type === "artist" ? styles.circle : styles.square
            }`}
            alt={title}
          />
          <div
            className={`${styles.imgOverlay} ${
              type === "artist" ? styles.circle : styles.square
            }`}
            onMouseEnter={() => setShowReset(true)}
            onMouseLeave={() => setShowReset(false)}
            onClick={() => removeRated(id)}
          ></div>
          <GoToBtn type={type} id={id} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <StarRating
          size={24}
          color="yellow"
          number={5}
          callback={addRated}
          beforeCallback={removeRated}
          item={ratedItem}
          defaultRating={ratedItem.rating}
        />
      </button>
    </li>
  );
}

export default RatedListItem;
