import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import { useRated } from "../context/RatedContext";
import NavBtns from "../components/UI-elements/NavBtns/";
import TopBar from "../components/Containers/TopBar";
import NavLinkItem from "../components/NavBar/NavLinkItem";
import LogoIcon from "../components/UI-elements/LogoIcon";

function RatedSongs() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated tracks...</div>;
  const tracks = ratedData.filter((item) => item.type === "track");
  console.log(tracks);

  return (
    <Results>
      <NavLinkItem
        to={""}
        icon={<LogoIcon />}
        text={
          <h1>
            Spoti<span>Lite</span>
          </h1>
        }
        end={true}
        className="logoMobile"
      />
      <TopBar>
        <NavBtns />
      </TopBar>
      {tracks.length === 0 && <div>No rated tracks...</div>}
      {tracks.length > 0 && (
        <>
          <ListContainer
            type="favoritePage"
            className="container-favorite-songs"
          >
            <TrackList tracks={tracks} title="Rated songs" type="big" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default RatedSongs;
