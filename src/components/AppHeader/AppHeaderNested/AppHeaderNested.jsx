import styles from "./AppHeaderNested.module.css";
import HamburgerIcon from "../../UI-elements/HamburgerIcon";
import NavBtns from "../../UI-elements/NavBtns";
import User from "../../User/";
import LogoMobile from "../LogoMobile";
import SearchBar from "../../SearchBar";
import { useInterface } from "../../../context/InterfaceContext";

function AppHeaderNested({
  noBackground,
  handleCloseHamburger,
  handleClickHamburger,
  hamburgerIsOpen,
  type = "normal",
}) {
  const { fixedHeaderIsColored } = useInterface();

  return (
    <header
      className={`${styles.appHeader} app-header ${
        noBackground ? styles.noBackground : ""
      } ${styles.greenBackground} ${type === "fixed" ? styles.fixed : ""} ${
        fixedHeaderIsColored ? styles.filter : ""
      }`}
    >
      <div className={styles.invertedBorderRadius} />
      <div className={styles.btnsContainer}>
        <div className={`${styles.appHeaderLeft} app-header-left`}>
          <NavBtns />
          <LogoMobile onClick={handleCloseHamburger} />
          <SearchBar />
        </div>
        <div className={`${styles.appHeaderRight} app-header-right`}>
          <User />
          <HamburgerIcon
            onClick={handleClickHamburger}
            isOpen={hamburgerIsOpen}
          />
        </div>
      </div>
    </header>
  );
}

export default AppHeaderNested;
