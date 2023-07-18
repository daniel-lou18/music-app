/* eslint-disable react/prop-types */
import styles from "./StarRating.module.css";

function StarRating({ color, number, size, text, defaultRating = 0 }) {
  return (
    <ul className={styles.starList}>
      <span className={`small-subtext`}>{text}</span>
      {Array.from({ length: number }, (el, idx) => (
        <li
          className={styles.starItem}
          key={idx}
          style={{ height: size, width: size }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export default StarRating;
