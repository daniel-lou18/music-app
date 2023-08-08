import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";

import { useBrowse } from "../../context/BrowseContext";
import { useMusic } from "../../context/MusicContext";

function NavBar() {
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
  };

  return (
    <nav className={styles.navBar}>
      <ul>
        <li className={styles.listItem}>
          <NavLink to={""} end className={styles.navLink}>
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
                className="feather feather-home fillable"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className={styles.textWrapper}>Home</div>
          </NavLink>
        </li>
        <li className={styles.listItem} onClick={handleSearch}>
          <NavLink to={"search"} className={styles.navLink}>
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
                className="feather feather-search fillable"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div className={styles.textWrapper}>Search</div>
          </NavLink>
        </li>
        <li className={styles.listItem} onClick={handleFavorites}>
          <Link className={`${styles.link} ${styles.dropdown}`}>
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
            <li
              className={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={"favorites/songs"} className={styles.subNavLink}>
                Songs
              </NavLink>
            </li>
            <li
              className={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={"favorites/artists"} className={styles.subNavLink}>
                Artists
              </NavLink>
            </li>
            <li
              className={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={"favorites/albums"} className={styles.subNavLink}>
                Albums
              </NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.listItem} onClick={handleRated}>
          <Link className={`${styles.link} ${styles.dropdown}`}>
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
            <li
              className={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={"rated/songs"} className={styles.subNavLink}>
                Songs
              </NavLink>
            </li>
            <li
              className={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={"rated/artists"} className={styles.subNavLink}>
                Artists
              </NavLink>
            </li>
            <li
              className={styles.subMenuItem}
              onClick={(e) => e.stopPropagation()}
            >
              <NavLink to={"rated/albums"} className={styles.subNavLink}>
                Albums
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
