import styles from "./Row.module.css";

function Row({ children, type = "horizontal" }) {
  return (
    <div
      className={`${styles.row} ${
        type === "horizontal" ? styles.horizontal : styles.vertical
      } row`}
    >
      {children}
    </div>
  );
}

export default Row;
