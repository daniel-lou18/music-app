import { useMusic } from "../../../context/MusicContext";
import IsPlayingIcon from "../IsPlayingIcon/IsPlayingIcon";
import LockIcon from "../LockIcon";
import PlayIcon from "../PlayIcon";

function PlayTrackBtn({ previewUrl, id }) {
  const { isPlayingId } = useMusic();

  return (
    <>
      {!previewUrl && <LockIcon classNames={[`playBtn`]} />}
      {previewUrl && isPlayingId !== id && (
        <PlayIcon classNames={[`playBtn`]} id={id} />
      )}
      {previewUrl && isPlayingId === id && (
        <IsPlayingIcon
          classNamesPause={["pauseContainer", "playBtn"]}
          classNamesPlaying={["noteContainer", "playBtn"]}
        />
      )}
    </>
  );
}

export default PlayTrackBtn;
