import { useMusic } from "../../../context/MusicContext";
import LockIcon from "../LockIcon";
import PlayIcon from "../PlayIcon";

function PlayTrackBtn({ previewUrl, id }) {
  const { isPlayingId, dispatch } = useMusic();

  const handlePlay = () => {
    dispatch({ type: "playing/set", payload: id });
  };

  return (
    <>
      {!previewUrl && (
        <div className={`playBtn`}>
          <LockIcon />
        </div>
      )}
      {previewUrl && isPlayingId !== id && (
        <div className={`playBtn`} onClick={handlePlay}>
          <PlayIcon />
        </div>
      )}
      {previewUrl && isPlayingId === id && (
        <div>
          <div
            className={`pauseContainer playBtn`}
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
              className={`pauseBtn`}
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
          <div
            className={`noteContainer playBtn`}
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
              className={`note`}
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

export default PlayTrackBtn;
