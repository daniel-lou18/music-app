import styles from "./ListContainer.module.css";

function ListContainer({ children, position = "horizontal", type, className }) {
  return (
    <section
      className={`${styles.listContainer} ${styles[position]} ${
        styles[className]
      } ${type === "artistPage" ? styles.artistPage : ""} ${
        type === "albumPage" ? styles.albumPage : ""
      } ${type === "favoritePage" ? "favoritePage" : ""}`}
    >
      {children}
    </section>
  );
}

export default ListContainer;
