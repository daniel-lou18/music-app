import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { MusicProvider } from "./context/MusicContext";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { BrowseProvider } from "./context/BrowseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <BrowseProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </BrowseProvider>
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>
);
