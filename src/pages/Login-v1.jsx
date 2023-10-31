import { useEffect, useState } from "react";
import Button from "../components/UI-elements/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { getToken, login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  return (
    <main>
      <div>Login Page</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button text="Login" type="submit" />
      </form>
    </main>
  );
}

export default Login;
