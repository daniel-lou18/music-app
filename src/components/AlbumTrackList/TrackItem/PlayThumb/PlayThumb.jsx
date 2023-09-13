import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./PlayThumb.module.css";
import { useMusic } from "../../../../context/MusicContext";
import LockIcon from "../../../UI-elements/LockIcon";
import PlayIcon from "../../../UI-elements/PlayIcon";
import IsPlayingIcon from "../../../UI-elements/IsPlayingIcon/IsPlayingIcon";
import ImgPlaceholder from "../../../UI-elements/ImgPlaceholder/ImgPlaceholder";

function PlayThumb({ id, name, artists, preview_url }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { currentAlbum, isPlayingId, dispatch } = useMusic();
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

  return (
    <div className={styles.playerContainer}>
      <div className={styles.imgWrapper}>
        <img
          className={`${styles.img} ${imgLoaded ? "" : styles.imgLoading}`}
          src={currentAlbum.images[currentAlbum.images.length - 1]?.url}
          alt={name}
          onLoad={() => setImgLoaded(true)}
        />
        {!imgLoaded && <ImgPlaceholder />}

        {!preview_url && (
          <LockIcon classNames={[styles.btnsContainer, "btnsContainer"]} />
        )}
        {preview_url && !isPlaying && (
          <PlayIcon
            classNames={[styles.btnsContainer, "btnsContainer"]}
            id={id}
            width={28}
            height={28}
          />
        )}
        {preview_url && isPlaying && (
          <IsPlayingIcon
            classNamesPause={[styles.btnsContainer, "btnsContainer"]}
            classNamesPlaying={[styles.btnsContainer, "noteContainer"]}
          />
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
        <Link className="link-no_styling" to={`/app/artist/${artists[0].id}`}>
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
