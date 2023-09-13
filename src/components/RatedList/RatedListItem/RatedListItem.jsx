import styles from "./RatedListItem.module.css";
import { useRated } from "../../../context/RatedContext";
import StarRating from "../../StarRating";
import { Link } from "react-router-dom";
import GoToBtn from "../../UI-elements/GoToBtn";
import ImgPlaceholder from "../../UI-elements/ImgPlaceholder/ImgPlaceholder";
import { useState } from "react";

function RatedListItem({ id, imgUrl, title, type, itemName, item }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ratedData, addRated, removeRated } = useRated();
  const ratedItem = ratedData.find((item) => item.id === id);

  return (
    <li className={`${styles.listItemWrapper}`}>
      <Link className={styles.listItem} to={`/app/${type}/${id}`}>
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
          <div
            className={`${styles.imgOverlay} ${
              type === "artist" ? styles.circle : styles.square
            }`}
          ></div>
          <GoToBtn />
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
      </Link>
    </li>
  );
}

export default RatedListItem;
