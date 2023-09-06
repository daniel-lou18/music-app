import styles from "./PlayIcon.module.css";
import { useMusic } from "../../../context/MusicContext";

function PlayIcon({ classNames, id, width = 24, height = 24 }) {
  const { dispatch } = useMusic();

  const handlePlay = () => {
    dispatch({ type: "playing/set", payload: id });
  };

  return (
    <div className={`${classNames?.join(" ")}`} onClick={handlePlay}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="#ffffffeb"
        stroke="#ffffffeb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${styles.playBtnIcon}`}
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  );
}

export default PlayIcon;
