import { Link } from "react-router-dom";
import LogoIcon from "../../UI-elements/LogoIcon";
import styles from "./LogoMobile.module.css";

function LogoMobile({ onClick }) {
  return (
    <Link to="" className={styles.logoLink} onClick={onClick}>
      <LogoIcon size={24} />
    </Link>
  );
}

export default LogoMobile;
