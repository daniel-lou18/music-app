import { NavLink } from "react-router-dom";

import styles from "./NavSubLinkItem.module.css";

function NavSubLinkItem({ to, onClick, text }) {
  return (
    <li className={styles.subMenuItem} onClick={onClick}>
      <NavLink to={to} className={styles.subNavLink}>
        {text}
      </NavLink>
    </li>
  );
}

export default NavSubLinkItem;
