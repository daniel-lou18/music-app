import { useEffect } from "react";
import HorizontalList from "../components/HorizontalList";
import { useHome } from "../context/HomeContext";
import { useMusic } from "../context/MusicContext";
import ListContainer from "../components/Containers/ListContainer";
import TopResult from "../components/TopResult";
import TrackList from "../components/TrackList";
import { topTracks } from "../../data/featuredArtist";
import Results from "../components/Containers/Results";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";

function Home() {
  const { data, dispatch } = useMusic();
  const { newReleases } = useHome();

  useEffect(() => {
    dispatch({ type: "playing/set", payload: "" });
    dispatch({ type: "reset" });
  }, [dispatch]);

  return (
    <Results>
      <TopBar>
        <NavBtns />
      </TopBar>
      <ListContainer position="left">
        <TopResult title="Featured Artist" type="featured" />
      </ListContainer>
      <ListContainer position="right">
        <TrackList tracks={data?.tracks?.items || topTracks} title="Songs" />
      </ListContainer>
      {newReleases?.length > 0 && (
        <ListContainer>
          <HorizontalList
            type="search"
            items={newReleases}
            title="New Releases"
            className="releases-albums"
          />
        </ListContainer>
      )}
    </Results>
  );
}

export default Home;
