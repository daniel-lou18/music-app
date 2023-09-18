import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import NavBar from "../components/NavBar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet } from "react-router-dom";
import HamburgerIcon from "../components/UI-elements/HamburgerIcon";
import { useState } from "react";
import AppHeader from "../components/Containers/AppHeader";
import NavBtns from "../components/UI-elements/NavBtns";
import User from "../components/User/";
import LogoIcon from "../components/UI-elements/LogoIcon";

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
          left={
            <>
              <NavBtns />
              <LogoIcon size={24} />
            </>
          }
          right={
            <>
              <User />
              <HamburgerIcon
                onClick={handleClickHamburger}
                isOpen={hamburgerIsOpen}
              />
            </>
          }
        ></AppHeader>
        <Outlet />
      </ContentContainer>
    </AppContainer>
  );
}

export default AppLayout;
