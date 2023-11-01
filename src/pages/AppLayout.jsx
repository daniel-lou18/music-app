import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import NavBar from "../components/NavBar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppHeaderNested from "../components/AppHeader/AppHeaderNested";
import BottomLine from "../components/BottomLine";
import { history } from "../helpers/history";

function AppLayout() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const location = useLocation();
  const pathIsAlbumOrArtist =
    location.pathname.includes("/app/artist") ||
    location.pathname.includes("/app/album");

  history.location = location;
  history.navigate = useNavigate();

  const handleClickHamburger = () => setHamburgerIsOpen((val) => !val);
  const handleCloseHamburger = () => setHamburgerIsOpen(false);

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
      <BottomLine />
    </AppContainer>
  );
}

export default AppLayout;
