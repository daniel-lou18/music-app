import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import RatedList from "../components/RatedList";
import { useRated } from "../context/RatedContext";

function RatedArtists() {
  const { ratedData } = useRated();
  if (ratedData.length === 0) return <div>No rated artists...</div>;
  const artists = ratedData.filter((item) => item.type === "artist");
  console.log(artists);

  return (
    <Results>
      {artists.length === 0 && <div>No rated artists...</div>}
      {artists.length > 0 && (
        <>
          <ListContainer>
            <RatedList items={artists} title="Rated artists" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default RatedArtists;
