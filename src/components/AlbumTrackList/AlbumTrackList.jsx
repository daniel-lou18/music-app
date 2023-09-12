import { useMusic } from "../../context/MusicContext";
import ErrorMsg from "../ErrorMsg";
import Spinner from "../UI-elements/Spinner";
import TrackItem from "./TrackItem";
import styles from "./AlbumTrackList.module.css";

function AlbumTrackList({ title, type, className }) {
  const { currentAlbum, isLoading, error } = useMusic();
  const trackItems = currentAlbum?.tracks?.items;

  if (!trackItems || trackItems.length < 1) return null;

  return (
    <>
      <h2 className={`section-title ${styles.title}`}>{title}</h2>
      <ul
        className={`${styles.tracklist} ${type === "big" ? styles.big : ""} ${
          styles[className]
        }`}
      >
        {isLoading && <Spinner />}
        {!isLoading && error && <ErrorMsg errorMsg={error} />}
        {!isLoading &&
          !error &&
          trackItems.map((track) => (
            <TrackItem key={track.id} track={track} type={type} />
          ))}
      </ul>
    </>
  );
}

export default AlbumTrackList;
