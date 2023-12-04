import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import InfoMsg from "../components/InfoMsg/";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import { useFavoriteAlbumsOperations } from "../hooks/useFavoritesOperations";
import { useNavigate } from "react-router-dom";
import CompoundList from "../components/HorizontalList/CompoundList";
import Row from "../components/UI-elements/Row/Row";

const sortOptions = [
  { value: "name-asc", label: "Sort by album name (A-Z)" },
  { value: "name-desc", label: "Sort by album name (Z-A)" },
  { value: "artist-asc", label: "Sort by artist name (A-Z)" },
  { value: "artist-desc", label: "Sort by artist name (Z-A)" },
  { value: "release_date-asc", label: "Sort by date (asc)" },
  { value: "release_date-desc", label: "Sort by date (desc)" },
];

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
          <CompoundList items={albums} first={true} type="albums">
            <Row>
              <CompoundList.Title>Favorite albums</CompoundList.Title>
              <CompoundList.Sort options={sortOptions} />
            </Row>
            <CompoundList.List />
          </CompoundList>
        )}
      </ListContainer>
    </Results>
  );
}

export default FavAlbums;
