/* eslint-disable react/prop-types */
import styles from "./PlayBtn.module.css";

function PlayBtn({ type }) {
  return (
    <div className={`${styles.playBtn} playBtn`}>
      {(type === "artist" || type === "album") && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      )}
      {type === "track" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#ffffffeb"
          stroke="#ffffffeb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.playBtnIcon}
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )}
    </div>
  );
}

export default PlayBtn;
