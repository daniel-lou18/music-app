import { useNavigate } from "react-router-dom";
import { useInterface } from "../context/InterfaceContext";

function useFromAlbumToArtist(type, item) {
  const { dispatch: dispatchInterface } = useInterface();
  const navigate = useNavigate();
  if (!item || !item.artists || item.artists.length === 0) return;

  return function () {
    if (type === "album") {
      dispatchInterface({ type: "header/fixed/transparent" });
      window.scrollTo(0, 0);
      navigate(`/app/artist/${item.artists[0].id}`);
    }
  };
}

export default useFromAlbumToArtist;
