import { useAuth } from "../../context/AuthContext";
import UserPlaceholder from "../UI-elements/UserPlaceholder";
import styles from "./User.module.css";

function User() {
  const { user } = useAuth();
  const profilePictureUrl = user.profile_picture.url;
  return (
    <div className={styles.buttonContainer}>
      <button>
        {profilePictureUrl && <img src={profilePictureUrl} alt="user" />}
        {!profilePictureUrl && <UserPlaceholder size={24} />}
      </button>
    </div>
  );
}

export default User;
