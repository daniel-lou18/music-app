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
  const audioEl = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  console.log(currentTime);

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
        {!isPlaying && (
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
              className={styles.playerBtn}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
        {isPlaying && (
          <div
            className={`${styles.btnsContainer} btnsContainer`}
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
              className={styles.playerBtn}
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.trackName}>{name}</h3>
        <h4 className={styles.trackArtist}>{artists[0].name}</h4>
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
      <div className={`${preview_url ? "" : "locked"} ${styles.audio}`}>
        <audio ref={audioEl} src={preview_url} />
      </div>
    </div>
  );
}

export default PlayThumb;
