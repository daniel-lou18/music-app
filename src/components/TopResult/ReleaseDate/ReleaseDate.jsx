import styles from "./ReleaseDate.module.css";

function ReleaseDate({ releaseDate }) {
  return (
    <div className={styles.releaseDateContainer}>
      <span className={`small-subtext ${styles.releaseDate}`}>
        Release date
      </span>
      <span className={`${styles.releaseDateNumber}`}>
        {releaseDate.slice(0, 4)}
      </span>
    </div>
  );
}

export default ReleaseDate;
