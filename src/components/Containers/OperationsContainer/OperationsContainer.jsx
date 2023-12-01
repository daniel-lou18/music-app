import styles from "./OperationsContainer.module.css";

function OperationsContainer({ children, type = "regular" }) {
  return (
    <div className={`${styles.operations} ${styles[type]}`}>{children}</div>
  );
}

export default OperationsContainer;
