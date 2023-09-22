import styles from "./BottomLine.module.css";

function BottomLine() {
  return (
    <div className={`${styles.bottom}`}>
      <div className={`${styles.bottomLeft}`}></div>
      <div className={`${styles.bottomRight}`}></div>
    </div>
  );
}

export default BottomLine;
