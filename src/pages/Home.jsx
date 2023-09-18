import { useEffect } from "react";
import HorizontalList from "../components/HorizontalList";
import { useHome } from "../context/HomeContext";
import { useMusic } from "../context/MusicContext";
import ListContainer from "../components/Containers/ListContainer";
import TopResult from "../components/TopResult";
import TrackList from "../components/TrackList";
import Results from "../components/Containers/Results";
import { useAuth } from "../context/AuthContext";
import User from "../components/User/User";

function Home() {
  const { dispatch } = useMusic();
  const {
    newReleasesData,
    popularTracksData,
    isLoadingTracks,
    isLoadingReleases,
    errorReleases,
    errorTracks,
  } = useHome();
  const { user } = useAuth();

  // console.log(popularTracksData);
  useEffect(() => {
    dispatch({ type: "playing/set", payload: "" });
    dispatch({ type: "reset" });
  }, [dispatch]);

  return (
    <Results>
      {/* <NavLinkItem
        to={""}
        icon={<LogoIcon />}
        text={
          <h1>
            Spoti<span>Lite</span>
          </h1>
        }
        end={true}
        className="logoMobile"
      /> */}
      {/* <>
        <NavBtns />
        <User />
      </> */}
      <ListContainer position="left">
        <TopResult title="Featured Artist" type="featured" />
      </ListContainer>
      <ListContainer position="right" className={"home-container-tracks"}>
        <TrackList
          tracks={popularTracksData}
          title="Popular Songs"
          className="popularTracks"
          isLoading={isLoadingTracks}
          error={errorTracks}
        />
      </ListContainer>
      <ListContainer>
        <HorizontalList
          type="search"
          items={newReleasesData}
          title="New Releases"
          className="releases-albums"
          isLoading={isLoadingReleases}
          error={errorReleases}
        />
      </ListContainer>
    </Results>
  );
}

export default Home;
