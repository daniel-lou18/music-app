import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { MusicProvider } from "./context/MusicContext";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>
);
