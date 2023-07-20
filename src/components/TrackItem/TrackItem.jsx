/* eslint-disable react/prop-types */
import PlayThumb from "../PlayThumb";
import TrackIcons from "../TrackIcons";
import styles from "./TrackItem.module.css";
import { useMusic } from "../../context/MusicContext";

function TrackItem({
  track: { id, preview_url, name, artists, album },
  isPlayingId,
  handlePlay,
  item,
}) {
  // const [redHeart, setRedHeart] = useState(false);
  const { dispatch } = useMusic();

  return (
    <li
      className={styles.trackItem}
      onClick={() => dispatch({ type: "topResult/set", payload: item })}
    >
      <PlayThumb
        id={id}
        preview_url={preview_url}
        album={album}
        isPlayingId={isPlayingId}
        handlePlay={handlePlay}
        name={name}
        artists={artists}
      />
      <TrackIcons />
    </li>
  );
}

export default TrackItem;
