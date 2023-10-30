import { useEffect, useState } from "react";
import styles from "./Alert.module.css";

function Alert({
  icon = false,
  text,
  timeout = 5000,
  position = "bottomRight",
}) {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (!timeout) return;
    const timerId = setTimeout(() => setIsVisible(false), timeout);
    return () => clearTimeout(timerId);
  }, [timeout]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.container} ${styles[position]} alert`}
      role="alert"
    >
      {icon}
      {!icon && (
        <svg
          className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      )}
      <div className={styles.text}>{text}</div>
      <button
        onClick={() => setIsVisible(false)}
        className={styles.closeButton}
        type="button"
        data-dismiss-target="#alert-1"
        aria-label="Close"
      >
        <svg
          className={styles.close}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default Alert;
