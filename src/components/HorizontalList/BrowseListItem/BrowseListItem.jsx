import styles from "./BrowseListItem.module.css";
import { useNavigate } from "react-router-dom";
import { useBrowse } from "../../../context/BrowseContext";
import ImgPlaceholder from "../../UI-elements/ImgPlaceholder";
import BrowseBtn from "../../UI-elements/BrowseBtn";
import { useState } from "react";
import { useInterface } from "../../../context/InterfaceContext";

function BrowseListItem({ imgUrl, title, genreName }) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { dispatch: dispatchBrowse } = useBrowse();
  const { dispatch: dispatchInterface } = useInterface();

  const handleBrowse = () => {
    dispatchBrowse({ type: "browse/genre", payload: genreName });
    dispatchInterface({ type: "header/fixed/transparent" });
    window.scrollTo(0, 0);
    navigate(`/app/browse/${genreName}`);
  };

  return (
    <li className={styles.listItemWrapper}>
      <button className={styles.listItem} onClick={handleBrowse}>
        <div className={styles.imgWrapper}>
          <img
            src={imgUrl}
            className={`${styles.img} ${styles.circle} ${
              imgLoaded ? "" : styles.imgLoading
            }`}
            alt={title}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && <ImgPlaceholder />}
          <BrowseBtn />
        </div>
        <div className={styles.textContainer}>
          <h3 className={`${styles.title} `}>{title}</h3>
        </div>
      </button>
    </li>
  );
}

export default BrowseListItem;
