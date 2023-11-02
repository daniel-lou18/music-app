import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserPlaceholder from "../UI-elements/UserPlaceholder";
import styles from "./User.module.css";
import { Link, useNavigate } from "react-router-dom";

function User() {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const { user, logout } = useAuth();
  const profilePictureUrl = user.profile_picture.url;
  const menuRef = useRef();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!menuIsVisible) return;
    const handleOutsideClick = (e) => {
      console.log(e.target);
      if (e.target.closest(".menuContainer")) return;
      setMenuIsVisible(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuIsVisible]);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setMenuIsVisible((val) => !val);
  };

  const handleLogout = () => {
    navigate("/login");
    logout();
  };

  return (
    <div className={styles.userContainer}>
      <button
        className={`${styles.buttonContainer} ${
          menuIsVisible ? styles.active : ""
        }`}
        onClick={handleButtonClick}
      >
        {profilePictureUrl && <img src={profilePictureUrl} alt="user" />}
        {!profilePictureUrl && <UserPlaceholder size={24} />}
      </button>
      {menuIsVisible && (
        <div className={`${styles.menuContainer} menuContainer`} ref={menuRef}>
          <div className={styles.userInfo}>
            <span
              className={styles.userName}
            >{`${user.firstName} ${user.lastName}`}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
          <div className={styles.menuItemsContainer}>
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>
                <Link to="#" className={styles.navLink}>
                  <span className={styles.iconWrapper}>
                    <UserPlaceholder size={20} />
                  </span>
                  <span>Account</span>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link to="#" className={styles.navLink}>
                  <span className={styles.iconWrapper}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-help-circle"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span>Help & Support</span>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link to="#" className={styles.navLink}>
                  <span className={styles.iconWrapper}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-settings"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </span>
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.logOut}>
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>
                <button className={styles.logOutButton} onClick={handleLogout}>
                  <span className={styles.iconWrapper}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </span>
                  <span>Sign out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
