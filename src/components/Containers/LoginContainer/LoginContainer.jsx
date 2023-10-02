import TopNavBar from "../../TopNavBar";
import styles from "./LoginContainer.module.css";

function LoginContainer({ children }) {
  return (
    <main className={styles.login}>
      <TopNavBar />
      {children}
    </main>
  );
}

export default LoginContainer;
