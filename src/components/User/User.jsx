import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserPlaceholder from "../UI-elements/UserPlaceholder";
import styles from "./User.module.css";
import { Link } from "react-router-dom";

function User() {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const { user } = useAuth();
  const profilePictureUrl = user.profile_picture.url;

  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => setMenuIsVisible((val) => !val)}>
        {profilePictureUrl && <img src={profilePictureUrl} alt="user" />}
        {!profilePictureUrl && <UserPlaceholder size={24} />}
      </button>
      {menuIsVisible && (
        <div className={styles.menuContainer}>
          <div className={styles.userInfo}>
            <span
              className={styles.userName}
            >{`${user.first_name} ${user.last_name}`}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
          <ul className={styles.menuItems}>
            <li className={styles.menuItem}>
              <Link to="#" className={styles.navLink}>
                Account
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="#" className={styles.navLink}>
                Help & Support
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="#" className={styles.navLink}>
                Settings
              </Link>
            </li>
          </ul>
          <div className={styles.logOut}>
            <Link to="#" className={styles.navLink}>
              Log out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
