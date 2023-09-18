import styles from "./AppHeader.module.css";

function AppHeader({ left, right, isVisible }) {
  return (
    <header
      className={`${styles.appHeader} app-header ${
        isVisible ? styles.noBackground : ""
      }`}
    >
      <div className={`${styles.appHeaderLeft} app-header-left`}>{left}</div>
      <div className={`${styles.appHeaderRight} app-header-right`}>{right}</div>
    </header>
  );
}

export default AppHeader;
