import PlayThumb from "./PlayThumb";
import TrackIcons from "./TrackIcons";
import styles from "./TrackItem.module.css";
import StarRating from "../../StarRating";
import { useRated } from "../../../context/RatedContext";
import { useMusic } from "../../../context/MusicContext";

function TrackItem({ track, type }) {
  const { id, preview_url, name, artists } = track;
  const { currentAlbum } = useMusic();
  const { ratedData, addRated, removeRated } = useRated();
  const ratedItem = ratedData.find((item) => item.id === id);

  return (
    <li className={`${styles.trackItem} ${type === "big" ? styles.big : ""}`}>
      <PlayThumb
        id={id}
        preview_url={preview_url}
        name={name}
        artists={artists}
      />
      {type === "big" && (
        <StarRating
          size={24}
          color="yellow"
          number={5}
          callback={addRated}
          beforeCallback={ratedItem ? removeRated : null}
          item={{ ...track, album: currentAlbum }}
          defaultRating={ratedItem?.rating}
        />
      )}
      <TrackIcons track={track} />
    </li>
  );
}

export default TrackItem;
