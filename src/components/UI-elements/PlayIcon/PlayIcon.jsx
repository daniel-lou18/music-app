import styles from "./PlayIcon.module.css";

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#ffffffeb"
      stroke="#ffffffeb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.playBtnIcon}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export default PlayIcon;
