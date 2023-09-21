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
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Browse from "./pages/Browse";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { InterfaceProvider } from "./context/InterfaceContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <InterfaceProvider>
                <AppLayout />
              </InterfaceProvider>
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <HomeProvider>
                <Home />
              </HomeProvider>
            }
          />
          <Route path="search" element={<Search />} />
          <Route path="browse/:genre" element={<Browse />} />
          <Route path="artist/:artistId" element={<Artist />} />
          <Route path="album/:albumId" element={<Album />} />
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
