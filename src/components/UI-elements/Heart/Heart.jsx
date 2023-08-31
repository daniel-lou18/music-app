/* eslint-disable react/prop-types */
import styles from "./Heart.module.css";

function Heart({ id, onClick, type, size = 28 }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={id ? "red" : "none"}
      stroke={id ? "none" : "darkgrey"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-heart ${id ? styles.redHeart : ""} ${
        styles[type]
      } ${styles.heartIcon}`}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default Heart;
