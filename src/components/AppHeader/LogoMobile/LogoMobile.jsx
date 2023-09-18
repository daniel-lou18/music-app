import { Link } from "react-router-dom";
import LogoIcon from "../../UI-elements/LogoIcon";
import styles from "./LogoMobile.module.css";

function LogoMobile() {
  return (
    <Link to="" className={styles.logoLink}>
      <LogoIcon size={24} />
    </Link>
  );
}

export default LogoMobile;
