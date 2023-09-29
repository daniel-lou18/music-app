import styles from "./SearchBar.module.css";
import { useMusic } from "../../context/MusicContext";
import { useLocation, useSearchParams } from "react-router-dom";
import { useBrowse } from "../../context/BrowseContext";
import { useEffect } from "react";

function SearchBar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = useMusic();
  const { dispatch: dispatchBrowse } = useBrowse();
  const query = searchParams.get("query") || "";

  const handleSearch = (e) => {
    setSearchParams({ query: e.target.value });
    dispatch({ type: "query/updated", payload: searchParams.get("query") });
    dispatchBrowse({ type: "reset" });
  };

  useEffect(() => {
    if (query) {
      setSearchParams({ query });
      dispatch({ type: "query/updated", payload: query });
      dispatchBrowse({ type: "reset" });
    }
  }, [dispatch, query, dispatchBrowse, searchParams, setSearchParams]);

  return (
    <div
      className={`${styles.searchContainer} ${
        location.pathname.includes("app/search") ? styles.visible : ""
      }`}
    >
      <div className={styles.searchField}>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 1 24 24"
            fill="none"
            stroke="#ffffffeb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="What do you want to listen to?"
        ></input>
      </div>
    </div>
  );
}

export default SearchBar;
