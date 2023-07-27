import { Outlet } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import { useEffect } from "react";

function Favorites() {
  const { dispatch } = useMusic();

  useEffect(() => {
    dispatch({ type: "playing/set", payload: "" });
    dispatch({ type: "reset" });
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Favorites;
