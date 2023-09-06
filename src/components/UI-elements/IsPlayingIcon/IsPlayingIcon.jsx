import styles from "./IsPlayingIcon.module.css";
import { useMusic } from "../../../context/MusicContext";

function IsPlayingIcon({
  classNamesPause,
  classNamesPlaying,
  width = 24,
  height = 24,
}) {
  const { dispatch } = useMusic();

  const handlePause = () => {
    dispatch({ type: "playing/set", payload: "" });
  };
  return (
    <>
      <div className={classNamesPause?.join(" ")} onClick={handlePause}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.pauseBtn}`}
        >
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      </div>
      <div className={classNamesPlaying?.join(" ")} onClick={handlePause}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.note}`}
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>
    </>
  );
}

export default IsPlayingIcon;
