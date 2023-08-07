/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";

function ContentContainer({ children }) {
  const location = useLocation();

  return (
    <div
      className={`content-container ${
        location.pathname.includes("app/artist") ? "artist-container" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
