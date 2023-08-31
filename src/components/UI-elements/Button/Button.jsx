import styles from "./Button.module.css";

function Button({ type = "button", text }) {
  return (
    <button type={type} className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
