import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./PlayThumb.module.css";
import { useMusic } from "../../context/MusicContext";
import LockIcon from "../UI-elements/LockIcon";

function PlayThumb({ album, id, name, artists, preview_url }) {
  const { isPlayingId, dispatch } = useMusic();
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

  const handleEnded = () => {
    setCurrentTime(0);
    audioEl.current.currentTime = 0;
    dispatch({ type: "playing/set", payload: "" });
  };

  const handleSlider = (e) => {
    audioEl.current.currentTime = e.target.value;
    setCurrentTime(audioEl.current.currentTime);
  };

  const handleArtistLink = () => {
    dispatch({ type: "artist/get", payload: artists[0].id });
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          src={album.images[album.images.length - 1]?.url}
          alt={name}
        />
        {!preview_url && (
          // <div className={`${styles.btnsContainer} btnsContainer`}>
          <LockIcon classNames={[styles.btnsContainer, "btnsContainer"]} />
          // </div>
        )}
        {preview_url && !isPlaying && (
          <div
            className={`${styles.btnsContainer} btnsContainer`}
            onClick={() => dispatch({ type: "playing/set", payload: id })}
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
          <div>
            <div
              className={`${styles.btnsContainer} ${styles.pauseContainer} pauseContainer btnsContainer`}
              onClick={() => dispatch({ type: "playing/set", payload: "" })}
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
            </div>
            <div
              className={`${styles.btnsContainer} ${styles.noteContainer} noteContainer`}
              onClick={() => dispatch({ type: "playing/set", payload: "" })}
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
      </div>
      <div
        className={`${styles.textContainer} ${
          name.length > 25 ? styles.trackNameSmall : ""
        }`}
      >
        <h3 className={`${styles.trackName}`}>
          {name.length > 40 ? `${name.slice(0, 40)}...` : name}
        </h3>
        <Link
          className="link-no_styling"
          to={`/app/artist/${artists[0].id}`}
          onClick={handleArtistLink}
        >
          <h4 className={styles.trackArtist}>
            {artists[0].name.length > 40
              ? `${artists[0].name.slice(0, 40)}...`
              : artists[0].name}
          </h4>
        </Link>
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
        <audio ref={audioEl} src={preview_url} onEnded={handleEnded} />
      </div>
    </div>
  );
}

export default PlayThumb;
