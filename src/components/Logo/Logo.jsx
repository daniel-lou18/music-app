import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link className={styles.logoContainer} to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-headphones"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path
          d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
          fill="rgb(32, 178, 170)"
        />
      </svg>
      <h1 className={styles.logoText}>
        Spoti<span>Lite</span>
      </h1>
    </Link>
  );
}

export default Logo;
