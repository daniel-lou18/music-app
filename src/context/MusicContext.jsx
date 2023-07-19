/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useLayoutEffect } from "react";

import { useAuth } from "./AuthContext";

const MusicContext = createContext();

const BASE_URL = "https://api.spotify.com/v1";

export const MusicProvider = ({ children }) => {
  const { token } = useAuth();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("coltrane");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (!query || !token) return;
    const controller = new AbortController();

    const fetchMusic = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `${BASE_URL}/search?q=${query}&type=artist,track,album&limit=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
            signal: controller.signal,
          }
        );
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (err) {
        // console.error(err);
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusic();
    return () => controller.abort();
  }, [token, query]);

  return (
    <MusicContext.Provider value={{ data, query, setQuery, error, isLoading }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};
