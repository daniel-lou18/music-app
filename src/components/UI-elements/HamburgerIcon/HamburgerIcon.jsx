import styles from "./HamburgerIcon.module.css";

function HamburgerIcon({ isOpen, onClick }) {
  return (
    <div
      className={`hamburgerIcon ${styles.hamburgerWrapper} ${
        isOpen ? styles.isOpen : ""
      }`}
      onClick={onClick}
    >
      <svg
        className={`${styles.hamburgerSvg}`}
        viewBox="0 0 100 100"
        width={32}
        height={32}
      >
        <rect
          className={`${styles.top} ${styles.line}`}
          width={70}
          height={8}
          y={26}
          x={15}
          rx={4}
        />
        <rect
          className={`${styles.middle} ${styles.line}`}
          width={70}
          height={8}
          y={46}
          x={15}
          rx={4}
        />
        <rect
          className={`${styles.bottom} ${styles.line}`}
          width={70}
          height={8}
          y={66}
          x={15}
          rx={4}
        />
      </svg>
    </div>
  );
}

export default HamburgerIcon;
