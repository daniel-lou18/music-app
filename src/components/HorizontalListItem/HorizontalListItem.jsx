/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import styles from "./HorizontalListItem.module.css";
import PlayBtn from "../UI-elements/PlayBtn/";

function HorizontalListItem({ id, imgUrl, title, subtitle, type, genreName }) {
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
        <PlayBtn type={type} id={id} genreName={genreName} />
      </div>
    </li>
  );
}

export default HorizontalListItem;
