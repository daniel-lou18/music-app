import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList";
import InfoMsg from "../components/InfoMsg/";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import { useFavoriteAlbumsOperations } from "../hooks/useFavoritesOperations";
import FavAlbumsOperations from "../components/Operations/FavAlbumsOperations";
import { useNavigate } from "react-router-dom";

function FavAlbums() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  let albums = favoritesData.filter((item) => item.type === "album");
  console.log(albums);

  albums = useFavoriteAlbumsOperations(albums);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      <ListContainer type="favoritePage">
        {albums.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Albums you like will appear here"
            paragraph_1="Save albums by clicking on the heart icon"
            btnText="Find albums"
            onClick={handleClick}
          />
        )}
        {albums.length > 0 && (
          <HorizontalList
            items={albums}
            title={<FavAlbumsOperations />}
            first={true}
          />
        )}
      </ListContainer>
    </Results>
  );
}

export default FavAlbums;
