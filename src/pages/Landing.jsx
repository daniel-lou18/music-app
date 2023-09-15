import { useNavigate } from "react-router-dom";
import Button from "../components/UI-elements/Button";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      Landing page
      <Button text="Login" onClick={() => navigate("login")} />
    </div>
  );
}

export default Landing;
