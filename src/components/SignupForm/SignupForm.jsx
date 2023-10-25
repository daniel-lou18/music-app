import { useEffect, useState } from "react";
import Button from "../UI-elements/Button";
import Spinner from "../UI-elements/Spinner";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";

function SignupForm() {
  const { getToken, login, isAuthenticated, user, isLoading, error } =
    useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      <div className={styles.row}>
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input
          type="passwordConfirm"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      <Button text="Create an account" type="submit" size="big" />
      <div className={`${styles.createAccount}`}>
        <span>Already have an account? </span>
        <Link to="/signup" className={`${styles.createAccountLink}`}>
          Sign in here
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
