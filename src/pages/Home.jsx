import { useEffect } from "react";
import HorizontalList from "../components/HorizontalList";
import { useHome } from "../context/HomeContext";
import { useMusic } from "../context/MusicContext";

function Home() {
  const { dispatch } = useMusic();
  const { newReleases } = useHome();

  useEffect(() => {
    dispatch({ type: "playing/set", payload: "" });
  }, [dispatch]);

  return (
    <div>
      {newReleases?.length > 0 && (
        <HorizontalList
          type="search"
          items={newReleases}
          title="New Releases"
        />
      )}
    </div>
  );
}

export default Home;
