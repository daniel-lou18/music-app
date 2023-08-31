import styles from "./Results.module.css";

function Results({ children }) {
  return <div className={styles.results}>{children}</div>;
}

export default Results;
