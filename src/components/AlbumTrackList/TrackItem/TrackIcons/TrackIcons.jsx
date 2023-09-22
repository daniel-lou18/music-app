import styles from "./TrackIcons.module.css";
import { useFavorites } from "../../../../context/FavoritesContext";
import Heart from "../../../UI-elements/Heart";
import AlbumIcon from "../../../UI-elements/AlbumIcon";
import ArtistIcon from "../../../UI-elements/ArtistIcon";

import { useNavigate } from "react-router-dom";
import { useMusic } from "../../../../context/MusicContext";
import { useInterface } from "../../../../context/InterfaceContext";

function TrackIcons({ track }) {
  const { id: spotifyId, artists } = track;
  const { currentAlbum } = useMusic();
  const { id: albumId } = currentAlbum;
  const { dispatch: dispatchInterface } = useInterface;
  const { favoritesData, addFavorite, removeFavorite } = useFavorites();
  const id = favoritesData.find((item) => item.id === spotifyId)?.id;

  const navigate = useNavigate();

  const handleFavorite = () => {
    if (!id) {
      addFavorite({ ...track, album: currentAlbum });
    } else {
      removeFavorite(id);
    }
  };

  const handleAlbum = () => {
    if (!albumId) return;
    dispatchInterface({ type: "header/fixed/transparent" });
    window.scrollTo(0, 0);
    navigate(`/app/album/${albumId}`);
  };

  const handleArtist = () => {
    if (!artists || artists.length === 0) return;
    dispatchInterface({ type: "header/fixed/transparent" });
    window.scrollTo(0, 0);
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
