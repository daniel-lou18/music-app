/* eslint-disable react/prop-types */
import TrackItem from "../TrackItem";
import styles from "./TrackList.module.css";

function TrackList({ tracks }) {
  return (
    <>
      <h2 className={`section-title ${styles.title}`}>Songs</h2>
      <ul className={styles.tracklist}>
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} item={track} />
        ))}
      </ul>
    </>
  );
}

export default TrackList;
