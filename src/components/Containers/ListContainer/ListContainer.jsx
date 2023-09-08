import styles from "./ListContainer.module.css";

function ListContainer({ children, position = "horizontal", type }) {
  return (
    <section
      className={`${styles.listContainer} ${styles[position]} ${
        type === "artistPage" ? styles.artistPage : ""
      } ${type === "albumPage" ? styles.albumPage : ""} ${
        type === "favoritePage" ? "favoritePage" : ""
      }`}
    >
      {children}
    </section>
  );
}

export default ListContainer;
