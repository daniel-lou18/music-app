/* eslint-disable no-unused-vars */

import { useMusic } from "./context/MusicContext";
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
  const { data, query, setQuery, error, isLoading } = useMusic();

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
