/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";

import { useMusic } from "../../../context/MusicContext";
import styles from "./PlayBtn.module.css";

function PlayBtn({ type, url, id }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioEl = useRef();

  const { dispatch } = useMusic();

  useEffect(() => {
    const handleEnded = () => setIsPlaying(false);
    const current = audioEl.current;
    current.addEventListener("ended", handleEnded);
    return () => current.removeEventListener("ended", handleEnded);
  }, []);

  const handleClick = () => {
    if (!isPlaying) {
      audioEl.current.play();
      setIsPlaying(true);
    } else {
      audioEl.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {(type === "artist" || type === "album") && (
        <div
          className={`${styles.playBtn} playBtn`}
          onClick={() => {
            if (type === "artist")
              dispatch({ type: "artist/get", payload: id });
            if (type === "album") dispatch({ type: "album/get", payload: id });
            window.scrollTo({
              top: 60,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
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
        </div>
      )}
      {type === "track" && !isPlaying && (
        <div className={`${styles.playBtn} playBtn`} onClick={handleClick}>
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
        </div>
      )}
      {type === "track" && isPlaying && (
        <div>
          <div
            className={`${styles.btnsContainer} ${styles.pauseContainer} pauseContainer playBtn`}
            onClick={handleClick}
          >
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
              className={`${styles.playerBtn} ${styles.pauseBtn} pauseBtn`}
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <div
            className={`${styles.btnsContainer} ${styles.noteContainer} noteContainer playBtn`}
            onClick={handleClick}
          >
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
              className={`${styles.playerBtn} ${styles.note} note`}
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        </div>
      )}
      <div className={`${styles.audio}`}>
        <audio ref={audioEl} src={url} />
      </div>
    </>
  );
}

export default PlayBtn;
