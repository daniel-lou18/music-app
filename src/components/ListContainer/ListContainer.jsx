/* eslint-disable react/prop-types */
import styles from "./ListContainer.module.css";

function ListContainer({ children, position = "horizontal" }) {
  return (
    <section className={`${styles.listContainer} ${styles[position]}`}>
      {children}
    </section>
  );
}

export default ListContainer;
