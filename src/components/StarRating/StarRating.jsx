import { useState } from "react";
import styles from "./StarRating.module.css";
import StarItem from "../UI-elements/StarItem";

function StarRating({
  color,
  number,
  size,
  text,
  defaultRating = 0,
  callback,
  beforeCallback,
  item,
  type,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [numHover, setNumHover] = useState(0);
  const numStars = numHover ? numHover : rating;

  const handleHover = (idx) => {
    setNumHover(idx + 1);
  };

  const handleLeave = () => {
    setNumHover(0);
  };

  const handleClick = async (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    if (beforeCallback) {
      await beforeCallback(item?.id);
      if (rating === 1 && idx === 0) {
        setRating(0);
        setNumHover(0);
        return;
      }
    }
    await callback(item, idx + 1);
    setRating(idx + 1);
  };

  return (
    <ul
      className={`${styles.starList} ${
        rating || numHover ? "" : styles.notRated
      }`}
    >
      <span
        className={`${`small-subtext`} ${type === "header" ? "header" : ""}`}
      >
        {text}
      </span>
      {Array.from({ length: number }, (el, idx) => (
        <StarItem
          key={idx}
          numStars={numStars}
          onHover={handleHover}
          onLeave={handleLeave}
          onClick={handleClick}
          idx={idx}
          size={size}
          color={color}
        />
      ))}
    </ul>
  );
}

export default StarRating;
