import styles from "./ErrorMsg.module.css";
import AlertIcon from "../UI-elements/AlertIcon";
import Button from "../UI-elements/Button";

function ErrorMsg({ errorMsg }) {
  return (
    <div className={styles.errorContainer}>
      <AlertIcon />
      <h2 className={styles.errorTitle}>Something went wrong</h2>
      <p className={styles.errorMsg}>{errorMsg}</p>
      <p className={styles.errorTip}>Try reloading the page</p>
      <Button text="Reload page" />
    </div>
  );
}

export default ErrorMsg;
