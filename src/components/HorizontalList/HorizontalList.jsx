/* eslint-disable react/prop-types */
import styles from "./HorizontalList.module.css";
import HorizontalListItem from "../HorizontalListItem";

function HorizontalList({ items }) {
  return (
    <ul className={styles.horList}>
      {items.map((item) => (
        <HorizontalListItem
          key={item.id}
          imgUrl={item?.images[0]?.url}
          id={item.id}
          title={item.name}
          subtitle={
            item.type === "artist" ? item.genres[0] : item.artists[0].name
          }
          type={item.type}
        />
      ))}
    </ul>
  );
}

export default HorizontalList;
