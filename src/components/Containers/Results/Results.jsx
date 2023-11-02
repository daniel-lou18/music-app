import styles from "./Results.module.css";

function Results({ children, type }) {
  return (
    <div className={`${styles.results} ${styles[type]} ${type}`}>
      {children}
    </div>
  );
}

export default Results;
