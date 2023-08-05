import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import { HomeProvider } from "./context/HomeContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import FavSongs from "./pages/FavSongs";
import FavArtists from "./pages/FavArtists";
import FavAlbums from "./pages/FavAlbums";
import Rated from "./pages/Rated";
import RatedSongs from "./pages/RatedSongs";
import RatedArtists from "./pages/RatedArtists";
import RatedAlbums from "./pages/RatedAlbums";

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
          <Route element={<Rated />}>
            <Route path="rated/songs" element={<RatedSongs />} />
            <Route path="rated/artists" element={<RatedArtists />} />
            <Route path="rated/albums" element={<RatedAlbums />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
