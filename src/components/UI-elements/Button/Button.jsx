import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ type = "button", text, onClick, to, size = "normal" }) {
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
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
