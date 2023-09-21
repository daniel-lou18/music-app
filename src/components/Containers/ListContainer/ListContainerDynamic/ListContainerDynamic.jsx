import { useEffect, useState } from "react";
import styles from "./ListContainerDynamic.module.css";

const SCROLL_Y = 240;

function ListContainerDynamic({
  children,
  position = "horizontal",
  type,
  className,
}) {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     window.scrollY > SCROLL_Y ? setIsVisible(false) : setIsVisible(true);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <section
      className={`${styles.listContainer} ${styles[position]} ${
        styles[className]
      } ${type === "artistPage" ? styles.artistPage : ""} ${
        type === "albumPage" ? styles.albumPage : ""
      } ${type === "favoritePage" ? "favoritePage" : ""} ${
        !isVisible ? styles.hidden : ""
      }`}
    >
      {children}
    </section>
  );
}

export default ListContainerDynamic;
