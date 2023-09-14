import { Link, useLocation } from "react-router-dom";
import styles from "./NavLinkCollapsible.module.css";

function NavLinkCollapsible({
  children,
  pathname,
  icon,
  text,
  onClick,
  isOpen,
}) {
  const location = useLocation();
  return (
    <li className={styles.listItem} onClick={onClick}>
      <Link
        className={`${styles.link} ${styles.dropdown} ${
          location.pathname.includes(pathname) ? "active" : ""
        }`}
      >
        <div className={styles.navItem}>
          <div className={styles.svgWrapper}>{icon}</div>
          <div className={styles.textWrapper}>{text}</div>
        </div>
        <div className={styles.chevron}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-chevron-down ${
              isOpen ? styles.chevronOpen : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </Link>
      <ul className={`${styles.subMenu} ${isOpen ? styles.subMenuOpen : ""}`}>
        {children}
      </ul>
    </li>
  );
}

export default NavLinkCollapsible;
