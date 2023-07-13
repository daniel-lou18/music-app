/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import { useAuth } from "./context/AuthContext";
import TrackList from "./components/TrackList";
import HorizontalList from "./components/HorizontalList/HorizontalList";
import "./App.css";
import ListContainer from "./components/ListContainer/ListContainer";
import Results from "./components/Results/Results";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

const BASE_URL = "https://api.spotify.com/v1";

function App() {
  const { token } = useAuth();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("coltrane");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query || !token) return;
    const fetchMusic = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `${BASE_URL}/search?q=${query}&type=artist,track,album&limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMusic();
  }, [token, query]);

  return (
    <div className="app-container">
      <div className="content-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <Results>
          {!error && !isLoading && data?.tracks?.items.length > 0 && (
            <ListContainer position="right">
              <TrackList tracks={data?.tracks?.items.slice(0, 5)} />
            </ListContainer>
          )}
          {!error && !isLoading && data?.tracks?.items.length > 0 && (
            <ListContainer>
              <HorizontalList items={data?.artists?.items} />
            </ListContainer>
          )}
          {!error && !isLoading && data?.tracks?.items.length > 0 && (
            <ListContainer>
              <HorizontalList items={data?.albums?.items} />
            </ListContainer>
          )}
        </Results>
      </div>
    </div>
  );
}

export default App;
