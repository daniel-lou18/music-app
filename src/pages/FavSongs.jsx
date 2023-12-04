import { useFavorites } from "../context/FavoritesContext";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import TrackList from "../components/TrackList";
import NoteIcon from "../components/UI-elements/NoteIcon/";
import InfoMsg from "../components/InfoMsg";
import { useNavigate } from "react-router-dom";
import FavSongsOperations from "../components/Operations/FavSongsOperations";
import { useFavoriteSongsOperations } from "../hooks/useFavoritesOperations";
import CompoundList from "../components/HorizontalList/CompoundList";
import Row from "../components/UI-elements/Row/Row";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const sortOptions = [
  { value: "name-asc", label: "Sort by song name (A-Z)" },
  { value: "name-desc", label: "Sort by song name (Z-A)" },
  { value: "artist-asc", label: "Sort by artist name (A-Z)" },
  { value: "artist-desc", label: "Sort by artist name (Z-A)" },
];

function FavSongs() {
  const navigate = useNavigate();
  const { favoritesData } = useFavorites();
  let tracks = favoritesData.filter((item) => item.type === "track");
  console.log(tracks);

  tracks = useFavoriteSongsOperations(tracks);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      <ListContainer type="favoritePage" className="container-favorite-songs">
        {tracks.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Songs you like will appear here"
            paragraph_1="Save songs by clicking on the heart icon"
            btnText="Find songs"
            onClick={handleClick}
          />
        )}
        {tracks.length > 0 && (
          <CompoundList items={tracks} first={true}>
            <Row>
              <CompoundList.Title>Favorite songs</CompoundList.Title>
              <CompoundList.Filter
                fieldName="subscription"
                options={filterOptions}
              />
              <CompoundList.Sort options={sortOptions} />
            </Row>
            <CompoundList.TrackList />
          </CompoundList>
        )}
      </ListContainer>
    </Results>
  );
}

export default FavSongs;
