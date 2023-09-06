import { useMusic } from "../../../context/MusicContext";
import ArrowIcon from "../ArrowIcon";

import { useNavigate } from "react-router-dom";

function GoToBtn({ type, id }) {
  const { dispatch } = useMusic();
  const navigate = useNavigate();

  const handleGet = () => {
    if (type === "artist") {
      dispatch({ type: "artist/get", payload: id });
      navigate(`/app/artist/${id}`);
    }
    if (type === "album") {
      dispatch({ type: "album/get", payload: id });
      navigate(`/app/album/${id}`);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className={`playBtn`} onClick={handleGet}>
      <ArrowIcon />
    </div>
  );
}

export default GoToBtn;
