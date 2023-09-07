import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import NavBar from "../components/NavBar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet } from "react-router-dom";
import HamburgerIcon from "../components/UI-elements/HamburgerIcon";
import { useState } from "react";

function AppLayout() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  const handleClickHamburger = () => setHamburgerIsOpen((val) => !val);
  const handleCloseHamburger = () => setHamburgerIsOpen(false);

  return (
    <AppContainer hamburgerIsOpen={hamburgerIsOpen}>
      <HamburgerIcon onClick={handleClickHamburger} isOpen={hamburgerIsOpen} />
      <Sidebar isVisible={hamburgerIsOpen}>
        <NavBar closeHamburger={handleCloseHamburger} />
      </Sidebar>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AppContainer>
  );
}

export default AppLayout;
