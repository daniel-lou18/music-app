import styles from "./HorizontalList.module.css";
import HorizontalListItem from "../HorizontalListItem";

function HorizontalList({
  items,
  title,
  type = "search",
  genreNames,
  className,
}) {
  if (!items || items.length < 1) return;
  return (
    <>
      {type === "search" && (
        <>
          <h2 className="section-title">{title}</h2>

          <ul className={`${styles.horList} ${className}`}>
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
                extended={true}
                item={item}
              />
            ))}
          </ul>
        </>
      )}
      {type === "browse" && (
        <>
          <h2 className="section-title">{title}</h2>

          <ul className={styles.horList}>
            {items.map((item, i) => (
              <HorizontalListItem
                key={i}
                imgUrl={item?.images[0]?.url}
                id={item.id}
                title={genreNames[i][0].toUpperCase() + genreNames[i].slice(1)}
                type={item.type}
                genreName={genreNames[i]}
                itemName={item.name}
                extended={false}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default HorizontalList;
