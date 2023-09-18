import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import NavBar from "../components/NavBar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppHeader from "../components/AppHeader";

function AppLayout() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  const handleClickHamburger = () => setHamburgerIsOpen((val) => !val);
  const handleCloseHamburger = () => setHamburgerIsOpen(false);

  return (
    <AppContainer hamburgerIsOpen={hamburgerIsOpen}>
      <Sidebar isVisible={hamburgerIsOpen}>
        <NavBar closeHamburger={handleCloseHamburger} />
      </Sidebar>
      <ContentContainer>
        <AppHeader
          isVisible={hamburgerIsOpen}
          handleClickHamburger={handleClickHamburger}
          hamburgerIsOpen={hamburgerIsOpen}
        ></AppHeader>
        <Outlet />
      </ContentContainer>
    </AppContainer>
  );
}

export default AppLayout;
