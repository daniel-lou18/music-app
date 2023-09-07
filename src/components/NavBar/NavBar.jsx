import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";

import { useBrowse } from "../../context/BrowseContext";
import { useMusic } from "../../context/MusicContext";
import HomeIcon from "../UI-elements/HomeIcon";
import SearchIcon from "../UI-elements/SearchIcon";
import NavLinkItem from "./NavLinkItem";
import NavSubLinkItem from "./NavSubLinkItem";

function NavBar({ closeHamburger }) {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [ratedOpen, setRatedOpen] = useState(false);
  const { dispatch } = useMusic();
  const { dispatch: dispatchBrowse } = useBrowse();
  const location = useLocation();

  const handleFavorites = () => {
    setFavoritesOpen((prev) => !prev);
  };

  const handleRated = () => {
    setRatedOpen((prev) => !prev);
  };

  const handleSearch = () => {
    dispatchBrowse({ type: "reset" });
    dispatch({ type: "reset" });
    closeHamburger();
  };

  const handleSubMenuClick = (e) => {
    e.stopPropagation();
    closeHamburger();
  };

  return (
    <nav className={styles.navBar}>
      <ul>
        <NavLinkItem
          to={""}
          onClick={closeHamburger}
          icon={<HomeIcon />}
          text={"Home"}
          end={true}
        />
        <NavLinkItem
          to={"search"}
          onClick={handleSearch}
          icon={<SearchIcon />}
          text={"Search"}
          end={false}
        />
        <li className={styles.listItem} onClick={handleFavorites}>
          <Link
            className={`${styles.link} ${styles.dropdown} ${
              location.pathname.includes("app/favorites") ? "active" : ""
            }`}
          >
            <div className={styles.navItem}>
              <div className={styles.svgWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather feather-heart ${
                    location.pathname.includes("app/favorites")
                      ? "fillable"
                      : ""
                  }`}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className={styles.textWrapper}>Favorites</div>
            </div>
            <div className={styles.chevron}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`feather feather-chevron-down ${
                  favoritesOpen ? styles.chevronOpen : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </Link>

          <ul
            className={`${styles.subMenu} ${
              favoritesOpen ? styles.subMenuOpen : ""
            }`}
          >
            <NavSubLinkItem
              to="favorites/songs"
              onClick={handleSubMenuClick}
              text="Songs"
            />
            <NavSubLinkItem
              to="favorites/artists"
              onClick={handleSubMenuClick}
              text="Artists"
            />
            <NavSubLinkItem
              to="favorites/albums"
              onClick={handleSubMenuClick}
              text="Albums"
            />
          </ul>
        </li>
        <li className={styles.listItem} onClick={handleRated}>
          <Link
            className={`${styles.link} ${styles.dropdown} ${
              location.pathname.includes("app/rated") ? "active" : ""
            }`}
          >
            <div className={styles.navItem}>
              <div className={styles.svgWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather feather-star ${
                    location.pathname.includes("app/rated") ? "fillable" : ""
                  }`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className={styles.textWrapper}>Rated</div>
            </div>
            <div className={styles.chevron}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`feather feather-chevron-down ${
                  ratedOpen ? styles.chevronOpen : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </Link>

          <ul
            className={`${styles.subMenu} ${
              ratedOpen ? styles.subMenuOpen : ""
            }`}
          >
            <NavSubLinkItem
              to="rated/songs"
              onClick={handleSubMenuClick}
              text="Songs"
            />
            <NavSubLinkItem
              to="rated/artists"
              onClick={handleSubMenuClick}
              text="Artists"
            />
            <NavSubLinkItem
              to="rated/albums"
              onClick={handleSubMenuClick}
              text="Albums"
            />
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
