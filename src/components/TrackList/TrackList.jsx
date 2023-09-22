import { useEffect, useRef } from "react";
import { useInterface } from "../../context/InterfaceContext";
import ErrorMsg from "../ErrorMsg";
import Spinner from "../UI-elements/Spinner";
import TrackItem from "./TrackItem";
import styles from "./TrackList.module.css";

function TrackList({
  tracks,
  title,
  type,
  className,
  isLoading,
  error,
  first = false,
}) {
  const { dispatch } = useInterface();
  const headerRef = useRef();

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
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
    <>
      <h2
        ref={first ? headerRef : null}
        className={`section-title ${styles.title}`}
      >
        {title}
      </h2>
      <ul
        className={`${styles.tracklist} ${type === "big" ? styles.big : ""} ${
          styles[className]
        }`}
      >
        {isLoading && <Spinner />}
        {!isLoading && error && <ErrorMsg errorMsg={error} />}
        {!isLoading &&
          !error &&
          tracks?.map((track) => (
            <TrackItem key={track.id} track={track} type={type} />
          ))}
      </ul>
    </>
  );
}

export default TrackList;
