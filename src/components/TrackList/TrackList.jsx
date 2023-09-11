import ErrorMsg from "../ErrorMsg";
import Spinner from "../UI-elements/Spinner";
import TrackItem from "./TrackItem";
import styles from "./TrackList.module.css";

function TrackList({ tracks, title, type, className, isLoading, error }) {
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
          tracks.map((track) => (
            <TrackItem key={track.id} track={track} item={track} type={type} />
          ))}
      </ul>
    </>
  );
}

export default TrackList;
