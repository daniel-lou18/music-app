/* eslint-disable react/prop-types */
import { useState } from "react";

import TrackItem from "../TrackItem";
import styles from "./TrackList.module.css";

function TrackList({ tracks }) {
  const [isPlayingId, setIsPlayingId] = useState("");

  const handlePlay = (id) => {
    setIsPlayingId(id);
  };

  return (
    <ul className={styles.tracklist}>
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          isPlayingId={isPlayingId}
          handlePlay={handlePlay}
        />
      ))}
    </ul>
  );
}

export default TrackList;
