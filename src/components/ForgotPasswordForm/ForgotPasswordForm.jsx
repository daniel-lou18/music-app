import { useEffect, useState } from "react";
import Button from "../UI-elements/Button";
import Spinner from "../UI-elements/Spinner";
import ErrorMsg from "../ErrorMsg";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordForm.module.css";

function ForgotPassword() {
  const { forgotPassword, isAuthenticated, user, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <ErrorMsg
        errorMsg={error}
        errorTip="Please verify the email address you provided"
      />
    );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={`${styles.title} section-title`}>Forgot your password?</h2>
      <p className={`${styles.text}`}>
        Just enter your email address below and we'll send you a link to reset
        your password!
      </p>
      <div className={styles.row}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button text="Reset password" type="submit" size="big" />
      <div className={`${styles.account}`}>
        <span>Already have an account? </span>
        <Link to="/login" className={`${styles.accountLink}`}>
          Sign in here
        </Link>
      </div>
      <div className={`${styles.account}`}>
        <span>Don't have an account yet? </span>
        <Link to="/signup" className={`${styles.accountLink}`}>
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default ForgotPassword;
