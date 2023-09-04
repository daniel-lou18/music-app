import styles from "./Sidebar.module.css";

function Sidebar({ children, isVisible }) {
  return (
    <div className={`${styles.sidebar} ${isVisible ? styles.visible : ""}`}>
      {children}
    </div>
  );
}

export default Sidebar;
