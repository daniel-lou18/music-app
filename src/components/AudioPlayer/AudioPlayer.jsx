import styles from "./AudioPlayer.module.css";

function AudioPlayer({ id, preview_url }) {
  // return (
  //   <iframe
  //     className={styles.audio}
  //     src={`https://open.spotify.com/embed/track/${id}`}
  //     width="450px"
  //     height="80px"
  //   ></iframe>
  // );

  return (
    <div className={`${preview_url ? "" : "locked"} ${styles.audio}`}>
      <audio src={preview_url} controls />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-play"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-pause"
        >
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      </div>
    </div>
  );
}

export default AudioPlayer;
