import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import NavBar from "../components/NavBar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import AppHeaderNested from "../components/AppHeader/AppHeaderNested";
import { useInterface } from "../context/InterfaceContext";

function AppLayout() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const location = useLocation();
  const { fixedHeaderIsColored } = useInterface();
  const pathIsAlbumOrArtist =
    location.pathname.includes("/app/artist") ||
    location.pathname.includes("/app/album");

  const handleClickHamburger = () => setHamburgerIsOpen((val) => !val);
  const handleCloseHamburger = () => setHamburgerIsOpen(false);

  const FOOTER_STYLE = {
    height: "8px",
    width: "100%",
    background: "black",
    position: "sticky",
    bottom: 0,
    gridColumn: "1 / -1",
  };

  return (
    <AppContainer hamburgerIsOpen={hamburgerIsOpen}>
      <Sidebar isVisible={hamburgerIsOpen}>
        <NavBar closeHamburger={handleCloseHamburger} />
      </Sidebar>
      <ContentContainer>
        <AppHeaderNested
          noBackground={hamburgerIsOpen}
          handleCloseHamburger={handleCloseHamburger}
          handleClickHamburger={handleClickHamburger}
          hamburgerIsOpen={hamburgerIsOpen}
          type={pathIsAlbumOrArtist && "fixed"}
        ></AppHeaderNested>
        <Outlet />
      </ContentContainer>
      <div style={FOOTER_STYLE}></div>
    </AppContainer>
  );
}

export default AppLayout;
