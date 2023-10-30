import { useEffect, useState } from "react";
import Button from "../UI-elements/Button";
import Spinner from "../UI-elements/Spinner";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const { getToken, isAuthenticated, login, user, isLoading, error } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    getToken();
    await login({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={`${styles.title} section-title`}>
        Log in to your account
      </h2>
      <div className={styles.row}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email: 'loutje@mail.com'"
        />
      </div>
      <div className={styles.row}>
        <div className={`${styles.passwordLabelContainer}`}>
          <label htmlFor="password">Password</label>
          <Link to="/forgot-password" className={styles.forgotPassword}>
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="password: 123456789"
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      <Button
        text={
          isLoading ? (
            <div className={`${styles.spinnerWrapper}`}>
              <Spinner />
            </div>
          ) : (
            "Log in"
          )
        }
        type="submit"
        size="big"
        disabled={isLoading ? true : false}
      />
      <div className={`${styles.createAccount}`}>
        <span>Don't have an account? </span>
        <Link to="/signup" className={`${styles.createAccountLink}`}>
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
