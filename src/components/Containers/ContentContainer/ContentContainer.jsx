import { useLocation } from "react-router-dom";

function ContentContainer({ children, hamburgerIsOpen }) {
  const location = useLocation();

  return (
    <div
      className={`content-container ${
        location.pathname.includes("app/artist") ||
        location.pathname.includes("app/album")
          ? "header-container"
          : ""
      } ${hamburgerIsOpen ? "hamburgerIsOpen" : ""}`}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
