import styles from "./AppHeader.module.css";
import HamburgerIcon from "../UI-elements/HamburgerIcon";
import NavBtns from "../UI-elements/NavBtns";
import User from "../User/";
import LogoMobile from "./LogoMobile";

function AppHeader({ isVisible, handleClickHamburger, hamburgerIsOpen }) {
  return (
    <header
      className={`${styles.appHeader} app-header ${
        isVisible ? styles.noBackground : ""
      }`}
    >
      <div className={`${styles.appHeaderLeft} app-header-left`}>
        <NavBtns />
        <LogoMobile />
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
