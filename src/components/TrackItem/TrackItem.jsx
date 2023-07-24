/* eslint-disable react/prop-types */
import PlayThumb from "../PlayThumb";
import TrackIcons from "../TrackIcons";
import styles from "./TrackItem.module.css";

function TrackItem({ track: { id, preview_url, name, artists, album } }) {
  return (
    <li className={styles.trackItem}>
      <PlayThumb
        id={id}
        preview_url={preview_url}
        album={album}
        name={name}
        artists={artists}
      />
      <TrackIcons spotifyId={id} />
    </li>
  );
}

export default TrackItem;
