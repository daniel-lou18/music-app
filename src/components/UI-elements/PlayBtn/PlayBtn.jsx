import { useMusic } from "../../../context/MusicContext";
import { useBrowse } from "../../../context/BrowseContext";
import styles from "./PlayBtn.module.css";
import LockIcon from "../LockIcon";
import ArrowIcon from "../ArrowIcon";

import { useNavigate } from "react-router-dom";
import PlayIcon from "../PlayIcon/PlayIcon";

function PlayBtn({ type, id, genreName, previewUrl }) {
  const { isPlayingId, dispatch } = useMusic();
  const { dispatch: dispatchBrowse } = useBrowse();
  const navigate = useNavigate();

  const handleGet = () => {
    if (type === "artist") {
      dispatch({ type: "artist/get", payload: id });
      navigate(`/app/artist/${id}`);
    }
    if (type === "album") {
      dispatch({ type: "album/get", payload: id });
      navigate(`/app/album/${id}`);
    }
    window.scrollTo(0, 0);
  };

  const handleBrowse = () => {
    // if (isBrowsing) dispatch({ type: "search/query", payload: itemName });

    dispatchBrowse({ type: "browse/genre", payload: genreName });
    navigate(`/app/browse/${genreName}`);

    window.scrollTo(0, 0);
  };

  const handlePlay = () => {
    dispatch({ type: "playing/set", payload: id });
  };

  return (
    <>
      {(type === "artist" || type === "album") && (
        <div
          className={`${styles.playBtn} playBtn`}
          onClick={genreName ? handleBrowse : handleGet}
        >
          <ArrowIcon />
        </div>
      )}
      {type === "track" && !previewUrl && (
        <div className={`${styles.playBtn} playBtn`}>
          <LockIcon />
        </div>
      )}
      {type === "track" && previewUrl && isPlayingId !== id && (
        <div className={`${styles.playBtn} playBtn`} onClick={handlePlay}>
          <PlayIcon />
        </div>
      )}
      {type === "track" && previewUrl && isPlayingId === id && (
        <div>
          <div
            className={`${styles.btnsContainer} ${styles.pauseContainer} pauseContainer playBtn`}
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
              className={`${styles.playerBtn} ${styles.pauseBtn} pauseBtn`}
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <div
            className={`${styles.btnsContainer} ${styles.noteContainer} noteContainer playBtn`}
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
    </>
  );
}

export default PlayBtn;
