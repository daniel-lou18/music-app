/* eslint-disable react/prop-types */
import styles from "./TrackIcons.module.css";
import { useFavorites } from "../../context/FavoritesContext";
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
      <svg
        onClick={handleFavorite}
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill={id ? "red" : "none"}
        stroke={id ? "none" : "darkgrey"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`feather feather-heart ${id ? styles.redHeart : ""}`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <svg
        onClick={handleAlbum}
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="darkgrey"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-disc"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg
        onClick={handleArtist}
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="darkgrey"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-user"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

export default TrackIcons;
