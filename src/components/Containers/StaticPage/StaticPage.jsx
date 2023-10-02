import { Link } from "react-router-dom";
import TopNavBar from "../../TopNavBar";
import styles from "./StaticPage.module.css";
import Button from "../../UI-elements/Button";

function StaticPage({ textContent, to, linkText }) {
  const { title, subtitle, text } = textContent;

  return (
    <main className={styles.homepage}>
      <TopNavBar />

      <section>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <h3>{text}</h3>
        <Button to={to} text={linkText.toUpperCase()} size="big" />
      </section>
    </main>
  );
}

export default StaticPage;
