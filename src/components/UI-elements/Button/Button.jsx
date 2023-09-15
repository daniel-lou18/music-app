import styles from "./Button.module.css";

function Button({ type = "button", text, onClick }) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
