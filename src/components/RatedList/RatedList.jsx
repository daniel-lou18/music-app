import styles from "./RatedList.module.css";
import RatedListItem from "../RatedListItem";

function RatedList({ items, title }) {
  if (!items || items.length < 1) return;
  return (
    <>
      <h2 className="section-title">{title}</h2>

      <ul className={styles.horList}>
        {items.map((item) => (
          <RatedListItem
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
    </>
  );
}

export default RatedList;
