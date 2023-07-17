/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import PopularityIcon from "../UI-elements/PopularityIcon/";
import styles from "./TopResult.module.css";
import PlayBtn from "../UI-elements/PlayBtn/PlayBtn";

function TopResult({ items, query }) {
  const [topResult, setTopResult] = useState([]);
  console.log(topResult);

  useEffect(() => {
    const itemsArray = [
      ...items.albums.items,
      ...items.artists.items,
      ...items.tracks.items,
    ];

    itemsArray.forEach((item) => {
      if (item.name.toLowerCase().includes(query)) setTopResult(item);
    });
  }, [items, query]);

  if (!Object.keys(topResult).length) return <div>No results...</div>;

  return (
    <div className={styles.resultContainer}>
      <h2 className="section-title">Top Result</h2>
      <div className={styles.result}>
        <img
          className={styles.img}
          src={
            topResult.type === "track"
              ? topResult.album.images[0]?.url
              : topResult.images[0]?.url
          }
        />
        <h3 className={styles.itemTitle}>{topResult.name}</h3>
        <div className={styles.itemSubtitles}>
          <h3 className={`${styles.firstSubtitle} small-subtext`}>
            {topResult.type === "track" || topResult.type === "album"
              ? topResult.artists[0]?.name
              : topResult.genres[0]}
          </h3>
          <h4 className={`${styles.secondSubtitle}`}>
            {topResult.type === "track"
              ? "Song"
              : topResult.type.slice(0, 1).toUpperCase() +
                topResult.type.slice(1)}
          </h4>
        </div>
        <div className={`${styles.lastLine}`}>
          <PopularityIcon
            popularity={
              topResult.type === "album"
                ? 3
                : Math.ceil(topResult.popularity / 20)
            }
          />
          <PlayBtn />
        </div>
      </div>
    </div>
  );
}

export default TopResult;
