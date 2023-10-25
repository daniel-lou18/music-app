import { useEffect, useState } from "react";
import Button from "../UI-elements/Button";
import Spinner from "../UI-elements/Spinner";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";

function SignupForm() {
  const { getToken, login, isAuthenticated, user, isLoading, error, dispatch } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm)
      return setPasswordConfirmMessage({
        message: `Passwords do not match \u2716`,
        color: "red",
      });
    getToken();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (!password || !passwordConfirm) return;
    if (password === passwordConfirm)
      setPasswordConfirmMessage({
        message: `Passwords match \u2713`,
        color: "green",
      });
    else setPasswordConfirmMessage("");
  }, [password, passwordConfirm]);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={`${styles.title} section-title`}>Create an account</h2>
      <div className={styles.row}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error?.errorType === "emailError" && (
          <p className={styles.message}>{error.message}</p>
        )}
      </div>
      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {error?.errorType === "passwordError" && (
          <p className={styles.message}>{error.message}</p>
        )}
      </div>
      <div className={styles.row}>
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {passwordConfirmMessage && (
          <p
            className={`${styles.message} ${
              passwordConfirmMessage.color === "green"
                ? styles.green
                : styles.red
            }`}
          >
            {passwordConfirmMessage.message}
          </p>
        )}
      </div>
      <Button text="Create an account" type="submit" size="big" />
      <div className={`${styles.createAccount}`}>
        <span>Already have an account? </span>
        <Link to="/login" className={`${styles.createAccountLink}`}>
          Sign in here
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
