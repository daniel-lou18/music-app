import StaticPage from "../components/Containers/StaticPage";

function Landing() {
  const textContent = {
    title: "Listen to your favorite music",
    subtitle: "Whenever, wherever, forever",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
  return (
    <StaticPage
      textContent={textContent}
      to="/login"
      linkText="Start listening"
    />
  );
}

export default Landing;
