import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { HomeProvider } from "./context/HomeContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import FavSongs from "./components/FavSongs";
import FavArtists from "./components/FavArtists";
import FavAlbums from "./components/FavAlbums";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="app" element={<AppLayout />}>
          <Route
            path=""
            element={
              <HomeProvider>
                <Home />
              </HomeProvider>
            }
          />
          <Route path="search" element={<Search />} />
          <Route element={<Favorites />}>
            <Route path="favorites/songs" element={<FavSongs />} />
            <Route path="favorites/artists" element={<FavArtists />} />
            <Route path="favorites/albums" element={<FavAlbums />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
