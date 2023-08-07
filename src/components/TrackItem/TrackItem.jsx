/* eslint-disable react/prop-types */
import PlayThumb from "../PlayThumb";
import TrackIcons from "../TrackIcons";
import styles from "./TrackItem.module.css";
import StarRating from "../StarRating";
import { useRated } from "../../context/RatedContext";

function TrackItem({ track, type }) {
  const { id, preview_url, name, artists, album } = track;
  const { ratedData, addRated, removeRated } = useRated();
  const ratedItem = ratedData.find((item) => item.id === id);

  return (
    <li className={`${styles.trackItem} ${type === "big" ? styles.big : ""}`}>
      <PlayThumb
        id={id}
        preview_url={preview_url}
        album={album}
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
          item={track}
          defaultRating={ratedItem?.rating}
        />
      )}
      <TrackIcons track={track} />
    </li>
  );
}

export default TrackItem;
