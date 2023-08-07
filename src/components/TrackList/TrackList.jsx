/* eslint-disable react/prop-types */
import TrackItem from "../TrackItem";
import styles from "./TrackList.module.css";

function TrackList({ tracks, title, type }) {
  return (
    <>
      <h2 className={`section-title ${styles.title}`}>{title}</h2>
      <ul className={`${styles.tracklist} ${type === "big" ? styles.big : ""}`}>
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} item={track} />
        ))}
      </ul>
    </>
  );
}

export default TrackList;
