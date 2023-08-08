import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList";

function FavArtists() {
  const { favoritesData } = useFavorites();
  const artists = favoritesData.filter((item) => item.type === "artist");
  console.log(artists);

  return (
    <Results>
      {artists.length === 0 && <div>No favorite artists...</div>}
      {artists.length > 0 && (
        <>
          <ListContainer>
            <HorizontalList items={artists} title="Favorite artists" />
          </ListContainer>
        </>
      )}
    </Results>
  );
}

export default FavArtists;