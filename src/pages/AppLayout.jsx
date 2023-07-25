import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <AppContainer>
      <Sidebar>
        <Logo />
        <NavBar />
      </Sidebar>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AppContainer>
  );
}

export default AppLayout;
