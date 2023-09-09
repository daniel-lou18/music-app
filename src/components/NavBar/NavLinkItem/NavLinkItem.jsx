import { NavLink } from "react-router-dom";

import styles from "./NavLinkItem.module.css";

function NavLinkItem({ to, onClick, icon, text, end = false, className }) {
  return (
    <li className={`${styles.listItem} ${styles[className]}`} onClick={onClick}>
      {end && (
        <NavLink to={to} end className={styles.navLink}>
          <div className={styles.svgWrapper}>{icon}</div>
          <div className={styles.textWrapper}>{text}</div>
        </NavLink>
      )}
      {!end && (
        <NavLink to={to} className={styles.navLink}>
          <div className={styles.svgWrapper}>{icon}</div>
          <div className={styles.textWrapper}>{text}</div>
        </NavLink>
      )}
    </li>
  );
}

export default NavLinkItem;
