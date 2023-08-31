import styles from "./TrackIcons.module.css";
import { useFavorites } from "../../context/FavoritesContext";
import Heart from "../UI-elements/Heart";
import AlbumIcon from "../UI-elements/AlbumIcon";
import ArtistIcon from "../UI-elements/ArtistIcon/ArtistIcon";

import { useNavigate } from "react-router-dom";

function TrackIcons({ track }) {
  const {
    id: spotifyId,
    artists,
    album: { id: albumId },
  } = track;
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const id = favoritesData.find((item) => item.id === spotifyId)?.id;

  const navigate = useNavigate();

  const handleFavorite = () => {
    console.log(favoritesData);
    console.log(id);
    if (!id) {
      addFavorite(track);
    } else {
      removeFavorite(id);
    }
  };

  const handleAlbum = () => {
    if (!albumId) return;
    navigate(`/app/album/${albumId}`);
  };

  const handleArtist = () => {
    if (!artists || artists.length === 0) return;
    navigate(`/app/artist/${artists[0].id}`);
  };

  return (
    <div className={styles.iconsContainer}>
      <Heart id={id} onClick={handleFavorite} />
      <AlbumIcon onClick={handleAlbum} />
      <ArtistIcon onClick={handleArtist} />
    </div>
  );
}

export default TrackIcons;
