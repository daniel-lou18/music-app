import AppContainer from "../components/Containers/AppContainer";
import Sidebar from "../components/Containers/Sidebar";
import ContentContainer from "../components/Containers/ContentContainer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <AppContainer>
      <Sidebar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AppContainer>
  );
}

export default AppLayout;
