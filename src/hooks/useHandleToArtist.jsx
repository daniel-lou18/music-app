import { useNavigate } from "react-router-dom";
import { useInterface } from "../context/InterfaceContext";

function useHandleToArtist(item, artistId) {
  const { dispatch: dispatchInterface } = useInterface();
  const navigate = useNavigate();
  if (!item || !artistId) return () => null;

  return function () {
    dispatchInterface({ type: "header/fixed/transparent" });
    navigate(`/app/artist/${artistId}`);
    window.scrollTo(0, 0);
  };
}

export default useHandleToArtist;
