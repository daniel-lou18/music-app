import styles from "./StarItem.module.css";

function StarItem({ numStars, onHover, onLeave, onClick, idx, size, color }) {
  return (
    <li
      className={styles.starItem}
      key={idx}
      style={{ height: size, width: size }}
      onMouseEnter={() => onHover(idx)}
      onMouseLeave={onLeave}
      onClick={(e) => onClick(e, idx)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 2 24 24"
        fill={idx < numStars ? color : "none"}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-star"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </li>
  );
}

export default StarItem;
