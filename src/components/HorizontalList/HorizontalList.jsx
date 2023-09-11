import styles from "./HorizontalList.module.css";
import HorizontalListItem from "./HorizontalListItem";
import BrowseListItem from "./BrowseListItem/BrowseListItem";
import Spinner from "../UI-elements/Spinner";
import ErrorMsg from "../ErrorMsg";

function HorizontalList({
  items,
  title,
  type = "search",
  genreNames,
  className,
  isLoading,
  error,
}) {
  return (
    <>
      {type === "search" && (
        <>
          <h2
            className={`section-title title-horizontal-list ${
              styles[`title-${className}`]
            }`}
          >
            {title}
          </h2>

          <ul className={`${styles.horList} ${className} ${styles[className]}`}>
            {isLoading && <Spinner />}
            {!isLoading && error && <ErrorMsg errorMsg={error} />}
            {!isLoading &&
              !error &&
              items &&
              items.length > 0 &&
              items.map((item) => (
                <HorizontalListItem
                  key={item.id}
                  imgUrl={item?.images[0]?.url}
                  id={item.id}
                  title={item.name}
                  subtitle={
                    item.type === "artist"
                      ? item.genres[0]
                      : item.artists[0].name
                  }
                  type={item.type}
                  item={item}
                />
              ))}
          </ul>
        </>
      )}
      {type === "browse" && (
        <>
          <h2
            className={`section-title title-browse-categories ${
              styles[`title-${className}`]
            }`}
          >
            {title}
          </h2>

          <ul className={`${styles.horList} ${className} ${styles[className]}`}>
            {isLoading && <Spinner />}
            {!isLoading && error && <ErrorMsg errorMsg={error} />}
            {!isLoading &&
              !error &&
              items &&
              items.length > 0 &&
              items.map((item, i) => (
                <BrowseListItem
                  key={i}
                  imgUrl={item?.images[0]?.url}
                  title={
                    genreNames[i][0].toUpperCase() + genreNames[i].slice(1)
                  }
                  genreName={genreNames[i]}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
}

export default HorizontalList;
