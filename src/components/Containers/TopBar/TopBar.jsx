import styles from "./TopBar.module.css";

function TopBar({ children }) {
  return <div className={`${styles.topBar} topBar`}>{children}</div>;
}

export default TopBar;
