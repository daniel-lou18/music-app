import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import { useFavoriteArtistsOperations } from "../hooks/useFavoritesOperations";
import { useNavigate } from "react-router-dom";
import CompoundList from "../components/HorizontalList/CompoundList";
import Row from "../components/UI-elements/Row/Row";

const sortOptions = [
  { value: "name-asc", label: "Sort by artist name (A-Z)" },
  { value: "name-desc", label: "Sort by artist name (Z-A)" },
];

function FavArtists() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  let artists = favoritesData.filter((item) => item.type === "artist");

  artists = useFavoriteArtistsOperations(artists);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      <ListContainer type="favoritePage">
        {artists.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Artists you like will appear here"
            paragraph_1="Save artists by clicking on the heart icon"
            btnText="Find artists"
            onClick={handleClick}
          />
        )}
        {artists.length > 0 && (
          <CompoundList items={artists} first={true} type="albums">
            <Row>
              <CompoundList.Title>Favorite artists</CompoundList.Title>
              <CompoundList.Sort options={sortOptions} />
            </Row>
            <CompoundList.List />
          </CompoundList>
        )}
      </ListContainer>
    </Results>
  );
}

export default FavArtists;
