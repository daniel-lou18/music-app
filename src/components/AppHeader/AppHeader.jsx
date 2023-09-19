import styles from "./AppHeader.module.css";
import HamburgerIcon from "../UI-elements/HamburgerIcon";
import NavBtns from "../UI-elements/NavBtns";
import User from "../User/";
import LogoMobile from "./LogoMobile";
import SearchBar from "../SearchBar";
import { useLocation } from "react-router-dom";

function AppHeader({
  noBackground,
  handleCloseHamburger,
  handleClickHamburger,
  hamburgerIsOpen,
}) {
  const location = useLocation();

  return (
    <header
      className={`${styles.appHeader} app-header ${
        noBackground ? styles.noBackground : ""
      } ${
        location.pathname.includes("/app/artist") ||
        location.pathname.includes("/app/album")
          ? styles.noBackground
          : ""
      }`}
    >
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
    </header>
  );
}

export default AppHeader;
