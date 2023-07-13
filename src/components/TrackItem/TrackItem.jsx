/* eslint-disable react/prop-types */
import { useState } from "react";
import PlayThumb from "../PlayThumb";
import styles from "./TrackItem.module.css";

function TrackItem({
  track: { id, preview_url, name, artists, album },
  isPlayingId,
  handlePlay,
}) {
  const [redHeart, setRedHeart] = useState(false);

  return (
    <li className={styles.trackItem}>
      <PlayThumb
        id={id}
        preview_url={preview_url}
        album={album}
        isPlayingId={isPlayingId}
        handlePlay={handlePlay}
        name={name}
        artists={artists}
      />
      <div className={styles.iconsContainer}>
        <svg
          onClick={() => setRedHeart((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={redHeart ? "red" : "none"}
          stroke={redHeart ? "none" : "darkgrey"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`feather feather-heart ${redHeart ? styles.redHeart : ""}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="darkgrey"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-disc"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="darkgrey"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-user"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </li>
  );
}

export default TrackItem;
