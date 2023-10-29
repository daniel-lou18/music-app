import { NavLink, Link } from "react-router-dom";
import styles from "./TopNavBar.module.css";
import Logo from "../Logo";

function TopNavBar() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li className={styles.listItem}>
          <Link to="#" className={styles.link}>
            Pricing
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="#" className={styles.link}>
            Product
          </Link>
        </li>
        <li className={styles.listItem}>
          <NavLink to="/signup" className={`${styles.link} ${styles.signup}`}>
            Sign Up
          </NavLink>
        </li>
        <li className={styles.listItem}>
          <NavLink
            to="/login"
            className={`${styles.cta} ${styles.link} ${styles.login}`}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TopNavBar;
