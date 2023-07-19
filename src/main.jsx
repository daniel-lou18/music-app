import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { MusicProvider } from "./context/MusicContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </AuthProvider>
  </React.StrictMode>
);
