import { useNavigate } from "react-router-dom";
import { useInterface } from "../context/InterfaceContext";

function useHandleToAlbum(item, albumId) {
  const { dispatch: dispatchInterface } = useInterface();
  const navigate = useNavigate();
  if (!item || !albumId) return () => null;

  return function () {
    dispatchInterface({ type: "header/fixed/transparent" });
    window.scrollTo(0, 0);
    navigate(`/app/album/${albumId}`);
  };
}

export default useHandleToAlbum;
