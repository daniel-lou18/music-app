/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./PlayThumb.module.css";

function PlayThumb({
  album,
  id,
  name,
  artists,
  preview_url,
  isPlayingId,
  handlePlay,
}) {
  const isPlaying = isPlayingId === id ? true : false;
  const [currentTime, setCurrentTime] = useState(0);
  const audioEl = useRef();

  useEffect(() => {
    isPlaying ? audioEl.current.play() : audioEl.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(audioEl.current.currentTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSlider = (e) => {
    audioEl.current.currentTime = e.target.value;
    setCurrentTime(audioEl.current.currentTime);
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          src={album.images[album.images.length - 1].url}
        />
        {!preview_url && (
          <div className={`${styles.btnsContainer} btnsContainer`}>
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
              className="feather feather-lock"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        )}
        {preview_url && !isPlaying && (
          <div
            className={`${styles.btnsContainer} btnsContainer`}
            onClick={() => handlePlay(id)}
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
              className={`${styles.playerBtn} ${styles.playBtn}`}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
        {preview_url && isPlaying && (
          <div
            className={`${styles.btnsContainer} ${styles.pauseNoteContainer} btnsContainer`}
            onClick={() => handlePlay("")}
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
              className={`${styles.playerBtn} ${styles.pauseBtn}`}
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
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
              className={`${styles.playerBtn} ${styles.note} note`}
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.trackName}>
          {name.length > 40 ? `${name.slice(0, 40)}...` : name}
        </h3>
        <h4 className={styles.trackArtist}>
          {artists[0].name.length > 40
            ? `${artists[0].name.slice(0, 40)}...`
            : artists[0].name}
        </h4>
      </div>
      <div className={styles.inputRange}>
        <input
          type="range"
          value={currentTime}
          min={0}
          max={29}
          onChange={handleSlider}
        />
      </div>
      <div className={`${styles.audio}`}>
        <audio ref={audioEl} src={preview_url} />
      </div>
    </div>
  );
}

export default PlayThumb;
