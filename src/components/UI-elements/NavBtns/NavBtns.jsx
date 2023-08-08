import styles from "./NavBtns.module.css";
import { useNavigate } from "react-router-dom";

function NavBtns() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.navBtns} navBtns`}>
      <div className={`${styles.navBtn} navBtn`} onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
      <div className={`${styles.navBtn} navBtn`} onClick={() => navigate(+1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}

export default NavBtns;
