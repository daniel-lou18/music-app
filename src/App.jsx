import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="app" element={<AppLayout />}>
          <Route path="" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
