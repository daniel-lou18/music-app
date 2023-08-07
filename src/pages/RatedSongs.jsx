import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import { useRated } from "../context/RatedContext";

function RatedSongs() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated tracks...</div>;
  const tracks = ratedData.filter((item) => item.type === "track");
  console.log(tracks);

  return (
    <Results>
      {tracks.length === 0 && <div>No rated tracks...</div>}
      {tracks.length > 0 && (
        <>
          <ListContainer type="favoritePage">
            <TrackList tracks={tracks} title="Rated songs" type="big" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default RatedSongs;
