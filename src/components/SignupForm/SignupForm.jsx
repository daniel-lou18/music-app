import { useEffect, useState } from "react";
import Button from "../UI-elements/Button";
import Spinner from "../UI-elements/Spinner";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { createPortal } from "react-dom";
import Alert from "../Alert";

function SignupForm() {
  const { getToken, signup, isAuthenticated, user, isLoading, error } =
    useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setPasswordConfirmMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm)
      return setPasswordConfirmMessage({
        message: `Passwords do not match \u2716`,
        color: "red",
      });
    getToken();
    const data = await signup({ firstName, lastName, email, password });
    if (data) {
      setShowAlert(true);
      handleReset();
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;
    // localStorage.setItem("currentUser", JSON.stringify(user));
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

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {showAlert &&
        createPortal(
          <Alert
            text={
              <p>
                Account successfully created. Log in with your email and
                password.{" "}
                <Link to="/login" className={`${styles.createAccountLink}`}>
                  Sign in here
                </Link>
              </p>
            }
            timeout={false}
            position="topCentered"
          />,
          document.body
        )}
      <h2 className={`${styles.title} section-title`}>Create an account</h2>
      <div className={styles.row}>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <p className={styles.message}>{error.message}</p>
      </div>
      <div className={styles.row}>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <p className={styles.message}>{error.message}</p>
      </div>
      <div className={styles.row}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className={styles.message}>{error.message}</p>
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

        <p
          className={`${styles.message} ${
            passwordConfirmMessage.color === "green" && !error
              ? styles.green
              : styles.red
          }`}
        >
          {error && <span className={`${styles.red}`}>{error}</span>}
          {!error && passwordConfirmMessage && passwordConfirmMessage.message}
        </p>
      </div>
      <div className={`${styles.btnContainer}`}>
        <Button
          className={`${styles.cancelBtn}`}
          text="Cancel"
          size="big"
          onClick={handleReset}
        />
        <Button
          className={`${styles.signupBtn}`}
          text={
            isLoading ? (
              <div className={`${styles.spinnerWrapper}`}>
                <Spinner />
              </div>
            ) : (
              "Create account"
            )
          }
          type="submit"
          size="big"
          disabled={isLoading ? true : false}
        />
      </div>
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
