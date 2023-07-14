/* eslint-disable react/prop-types */
import styles from "./SearchBar.module.css";

function SearchBar({ query, onQuery }) {
  return (
    <div className={styles.searchField}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
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
      </span>
      <input type="text" value={query} onChange={(e) => onQuery(e)}></input>
    </div>
  );
}

export default SearchBar;