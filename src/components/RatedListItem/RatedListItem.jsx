/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import styles from "./RatedListItem.module.css";
import PlayBtn from "../UI-elements/PlayBtn";
import { useRated } from "../../context/RatedContext";
import StarRating from "../StarRating";

function RatedListItem({
  id,
  imgUrl,
  title,
  subtitle,
  type,
  genreName,
  itemName,
}) {
  const { ratedData, addRated, removeRated } = useRated();
  const ratedItem = ratedData.find((item) => item.id === id);

  return (
    <li className={styles.listItem}>
      <div className={styles.imgWrapper}>
        <img
          src={imgUrl}
          className={`${styles.img} ${
            type === "artist" ? styles.circle : styles.square
          }`}
        />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.subtitle}>{subtitle}</h4>
        <PlayBtn
          type={type}
          id={id}
          genreName={genreName}
          itemName={itemName}
        />
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
    </li>
  );
}

export default RatedListItem;
