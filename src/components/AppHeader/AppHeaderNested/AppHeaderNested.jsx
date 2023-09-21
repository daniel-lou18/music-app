import styles from "./AppHeaderNested.module.css";
import HamburgerIcon from "../../UI-elements/HamburgerIcon";
import NavBtns from "../../UI-elements/NavBtns";
import User from "../../User/";
import LogoMobile from "../LogoMobile";
import SearchBar from "../../SearchBar";
import { useEffect, useRef } from "react";
import { useInterface } from "../../../context/InterfaceContext";

function AppHeaderNested({
  noBackground,
  handleCloseHamburger,
  handleClickHamburger,
  hamburgerIsOpen,
}) {
  const { nestedHeaderIsVisible, dispatch } = useInterface();
  const headerRef = useRef();

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 1)
          dispatch({ type: "nestedHeader/false" });
        else dispatch({ type: "nestedHeader/true" });
      },
      { threshold: [1] }
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [dispatch, nestedHeaderIsVisible]);

  return (
    <header
      ref={headerRef}
      className={`${styles.appHeader} app-header ${
        noBackground ? styles.noBackground : ""
      } ${styles.greenBackground} ${
        nestedHeaderIsVisible ? "" : styles.hidden
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
