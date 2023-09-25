import { Link } from "react-router-dom";
import LogoIcon from "../../UI-elements/LogoIcon";
import styles from "./LogoMobile.module.css";

function LogoMobile({ onClick }) {
  return (
    <Link to="" className={styles.logoLink} onClick={onClick}>
      <div className={styles.logoWrapper}>
        <LogoIcon size={24} />
      </div>
    </Link>
  );
}

export default LogoMobile;
