import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({
  type = "button",
  text,
  onClick,
  to,
  size = "normal",
  disabled = false,
  className,
}) {
  if (to)
    return (
      <Link
        className={`${styles.link} ${styles.button} ${
          size === "big" ? styles.big : ""
        }`}
        to={to}
      >
        {text}
      </Link>
    );
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
