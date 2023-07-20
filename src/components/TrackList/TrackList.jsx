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
    <>
      <h2 className="section-title">Songs</h2>
      <ul className={styles.tracklist}>
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isPlayingId={isPlayingId}
            handlePlay={handlePlay}
            item={track}
          />
        ))}
      </ul>
    </>
  );
}

export default TrackList;
