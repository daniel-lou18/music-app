/* eslint-disable no-unused-vars */
import { useState, useLayoutEffect } from "react";

import { useAuth } from "./context/AuthContext";
import AppContainer from "./components/Containers/AppContainer";
import ContentContainer from "./components/Containers/ContentContainer";
import Sidebar from "./components/Containers/Sidebar";
import SearchBar from "./components/SearchBar";
import TopResult from "./components/TopResult";
import TrackList from "./components/TrackList";
import HorizontalList from "./components/HorizontalList/HorizontalList";
import "./App.css";
import ListContainer from "./components/Containers/ListContainer/";
import Results from "./components/Containers/Results";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

const BASE_URL = "https://api.spotify.com/v1";

function App() {
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

  const handleQuery = (e) => setQuery(e.target.value);

  return (
    <AppContainer>
      <Sidebar />
      <ContentContainer>
        <SearchBar query={query} onQuery={handleQuery} />
        <Results>
          {!error && data?.tracks?.items.length > 0 && (
            <>
              <ListContainer position="left">
                <TopResult items={data} query={query} />
              </ListContainer>
              <ListContainer position="right">
                <TrackList tracks={data?.tracks?.items} />
              </ListContainer>
              <ListContainer>
                <HorizontalList
                  items={data?.artists?.items}
                  title={"Artists"}
                />
              </ListContainer>
              <ListContainer>
                <HorizontalList items={data?.albums?.items} title={"Albums"} />
              </ListContainer>
            </>
          )}
        </Results>
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
