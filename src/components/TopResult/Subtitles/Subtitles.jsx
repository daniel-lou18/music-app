import styles from "./Subtitles.module.css";

function Subtitles({ topResult }) {
  return (
    <div className={styles.itemSubtitles}>
      <h3
        className={`${styles.firstSubtitle} small-subtext ${
          topResult.type === "artist" && topResult.genres.length === 0
            ? styles.firstSubtitleHidden
            : ""
        } `}
      >
        {topResult.type === "track" || topResult.type === "album"
          ? topResult.artists[0]?.name
          : topResult.genres[0]}
      </h3>
      <h4 className={`${styles.secondSubtitle}`}>
        {topResult.type === "track"
          ? "Song"
          : topResult.type.slice(0, 1).toUpperCase() + topResult.type.slice(1)}
      </h4>
    </div>
  );
}

export default Subtitles;
