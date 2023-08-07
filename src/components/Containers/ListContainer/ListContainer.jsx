/* eslint-disable react/prop-types */
import styles from "./ListContainer.module.css";

function ListContainer({ children, position = "horizontal", type }) {
  return (
    <section
      className={`${styles.listContainer} ${styles[position]} ${
        type === "artistPage" ? styles.artistPage : ""
      }`}
    >
      {children}
    </section>
  );
}

export default ListContainer;
