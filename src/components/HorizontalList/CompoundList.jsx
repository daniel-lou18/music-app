import styles from "./HorizontalList.module.css";
import HorizontalListItem from "./HorizontalListItem";
import Spinner from "../UI-elements/Spinner";
import ErrorMsg from "../ErrorMsg";
import { useInterface } from "../../context/InterfaceContext";
import { createContext, useContext, useEffect, useRef } from "react";
import SortBy from "../UI-elements/SortBy/SortBy";
import MyFilter from "../UI-elements/Filter/Filter";
import TrackItem from "../TrackList/TrackItem";
import RatedListItem from "../RatedList/RatedListItem";

const CompoundListContext = createContext();

function Title({ children }) {
  const { className, first } = useContext(CompoundListContext);
  const { dispatch } = useInterface();
  const headerRef = useRef();

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          dispatch({ type: "header/fixed/transparent" });
        else dispatch({ type: "header/fixed/colored" });
      },
      { rootMargin: "-71px" }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [dispatch]);

  return (
    <h2
      ref={first ? headerRef : null}
      className={`section-title title-horizontal-list ${
        styles[`title-${className}`]
      }`}
    >
      {children}
    </h2>
  );
}

function Sort({ options }) {
  return <SortBy options={options} />;
}

function Filter({ fieldName, options }) {
  return <MyFilter fieldName={fieldName} options={options} />;
}

function List() {
  const { className, isLoading, error, items } =
    useContext(CompoundListContext);

  return (
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
              item.type === "artist" ? item.genres[0] : item.artists[0].name
            }
            type={item.type}
            item={item}
          />
        ))}
    </ul>
  );
}

function TrackList({ type }) {
  const {
    className,
    isLoading,
    error,
    items: tracks,
  } = useContext(CompoundListContext);

  return (
    <ul
      className={`${styles.tracklist} ${type === "big" ? styles.big : ""} ${
        styles[className]
      }`}
    >
      {!isLoading && error && <ErrorMsg errorMsg={error} />}
      {!isLoading &&
        !error &&
        tracks?.map((track) => (
          <TrackItem key={track.id} track={track} type={type} />
        ))}
    </ul>
  );
}

function RatedList() {
  const { items } = useContext(CompoundListContext);
  return (
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
          item={item}
        />
      ))}
    </ul>
  );
}

function CompoundList({
  children,
  items,
  className,
  isLoading,
  error,
  type,
  first = false,
}) {
  return (
    <CompoundListContext.Provider
      value={{ items, className, isLoading, error, first }}
    >
      <div type={type} className={`${styles.compoundList} ${styles[type]}`}>
        {children}
      </div>
    </CompoundListContext.Provider>
  );
}

CompoundList.Title = Title;
CompoundList.Filter = Filter;
CompoundList.Sort = Sort;
CompoundList.List = List;
CompoundList.TrackList = TrackList;
CompoundList.RatedList = RatedList;

export default CompoundList;
