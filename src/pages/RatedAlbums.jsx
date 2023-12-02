import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import RatedList from "../components/RatedList";
import { useRated } from "../context/RatedContext";
import InfoMsg from "../components/InfoMsg";
import NoteIcon from "../components/UI-elements/NoteIcon";
import RatedAlbumsOperations from "../components/Operations/RatedAlbumsOperations";
import { useRatedAlbumsOperations } from "../hooks/useRatedOperations";
import { useNavigate } from "react-router-dom";

function RatedAlbums() {
  const navigate = useNavigate();
  const { ratedData } = useRated();
  let albums = ratedData.filter((item) => item.type === "album");

  albums = useRatedAlbumsOperations(albums);

  const handleClick = () => navigate("/app/search");

  return (
    <Results>
      <ListContainer type="favoritePage">
        {albums.length === 0 && (
          <InfoMsg
            logo={<NoteIcon size={75} />}
            heading="Albums you rate will appear here"
            paragraph_1="Rate albums by clicking on a star"
            paragraph_2="Remove ratings by clicking two times on the first star"
            btnText="Find albums"
            onClick={handleClick}
          />
        )}
        {albums.length > 0 && (
          <RatedList
            items={albums}
            title={<RatedAlbumsOperations />}
            first={true}
          />
        )}
      </ListContainer>
    </Results>
  );
}

export default RatedAlbums;
