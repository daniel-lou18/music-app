/* eslint-disable react/prop-types */
import styles from "./PopularityIcon.module.css";

function PopularityIcon({ popularity = 3, type }) {
  return (
    <div
      className={`${styles.popularityContainer} popularityContainer ${
        type === "header" ? "header" : ""
      }`}
    >
      <div className={`${styles.popularityLabel} small-subtext`}>
        Popularity:{" "}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#3c3c3c"
        stroke="none"
        strokeWidth="none"
        strokeLinecap="square"
        strokeLinejoin="round"
        className={`${styles.popularityIcon}`}
      >
        <rect
          x="6"
          y="4"
          width="2"
          height="12"
          className={`${popularity > 0 ? styles.one : ""}`}
        />
        <rect
          x="10"
          y="4"
          width="2"
          height="12"
          className={`${popularity > 1 ? styles.two : ""}`}
        />
        <rect
          x="14"
          y="4"
          width="2"
          height="12"
          className={`${popularity > 2 ? styles.three : ""}`}
        />
        <rect
          x="18"
          y="4"
          width="2"
          height="12"
          className={`${popularity > 3 ? styles.four : ""}`}
        />
        <rect
          x="22"
          y="4"
          width="2"
          height="12"
          className={`${popularity > 4 ? styles.five : ""}`}
        />
      </svg>
    </div>
  );
}

export default PopularityIcon;
