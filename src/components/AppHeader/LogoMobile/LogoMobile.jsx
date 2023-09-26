import { Link } from "react-router-dom";
import LogoIcon from "../../UI-elements/LogoIcon";
import styles from "./LogoMobile.module.css";
import { useLocation } from "react-router-dom";

function LogoMobile({ onClick }) {
  const location = useLocation();

  return (
    <Link to="" className={styles.logoLink} onClick={onClick}>
      <div className={styles.logoWrapper}>
        <LogoIcon size={24} />
      </div>
      {!location.pathname.includes("app/search") && (
        <h1>
          Spoti<span>Lite</span>
        </h1>
      )}
    </Link>
  );
}

export default LogoMobile;
