import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { MusicProvider } from "./context/MusicContext";
import { BrowseProvider } from "./context/BrowseContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { RatedProvider } from "./context/RatedContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <BrowseProvider>
          <FavoritesProvider>
            <RatedProvider>
              <App />
            </RatedProvider>
          </FavoritesProvider>
        </BrowseProvider>
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>
);
