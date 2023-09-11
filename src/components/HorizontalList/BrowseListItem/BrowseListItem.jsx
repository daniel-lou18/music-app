import styles from "./BrowseListItem.module.css";
import { useNavigate } from "react-router-dom";
import { useBrowse } from "../../../context/BrowseContext";
import ImgPlaceholder from "../../UI-elements/ImgPlaceholder";
import BrowseBtn from "../../UI-elements/BrowseBtn";

function BrowseListItem({ imgUrl, title, genreName }) {
  const navigate = useNavigate();

  const { dispatch: dispatchBrowse } = useBrowse();

  const handleBrowse = () => {
    dispatchBrowse({ type: "browse/genre", payload: genreName });
    navigate(`/app/browse/${genreName}`);

    window.scrollTo(0, 0);
  };

  const handleNoHoverNavigate = function () {
    const regexMobile =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (!regexMobile.test(navigator.userAgent)) return;
    handleBrowse();
  };

  return (
    <li className={styles.listItemWrapper}>
      <button className={styles.listItem} onClick={handleNoHoverNavigate}>
        <div className={styles.imgWrapper}>
          {imgUrl && (
            <img
              src={imgUrl}
              className={`${styles.img} ${styles.circle}`}
              alt={title}
            />
          )}
          {!imgUrl && <ImgPlaceholder />}
          <BrowseBtn genreName={genreName} />
        </div>
        <div className={styles.textContainer}>
          <h3 className={`${styles.title} `}>{title}</h3>
        </div>
      </button>
    </li>
  );
}

export default BrowseListItem;
