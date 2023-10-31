import styles from "./ErrorMsg.module.css";
import AlertIcon from "../UI-elements/AlertIcon";
import Button from "../UI-elements/Button";
import { useLocation, useNavigate } from "react-router-dom";

function ErrorMsg({
  errorMsg,
  errorTip = "Try reloading the page",
  displayButton = true,
  buttonText = "Reload page",
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`${styles.errorContainer} errorContainer`}>
      <AlertIcon />
      <h2 className={styles.errorTitle}>Something went wrong</h2>
      <p className={styles.errorMsg}>{errorMsg}</p>
      <p className={styles.errorTip}>{errorTip}</p>
      {displayButton && (
        <Button text={buttonText} onClick={() => navigate(location.pathname)} />
      )}
    </div>
  );
}

export default ErrorMsg;
