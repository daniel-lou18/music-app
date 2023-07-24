import SearchBar from "../components/SearchBar";
import Results from "../components/Containers/Results";
import ListContainer from "../components/Containers/ListContainer";
import HorizontalList from "../components/HorizontalList/";
import TrackList from "../components/TrackList";
import TopResult from "../components/TopResult";
import { useMusic } from "../context/MusicContext";

function Search() {
  const { data, query, error, dispatch } = useMusic();
  console.log(data);

  return (
    <>
      <SearchBar
        query={query}
        onQuery={(e) =>
          dispatch({ type: "search/query", payload: e.target.value })
        }
      />
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
              <HorizontalList items={data?.artists?.items} title={"Artists"} />
            </ListContainer>
            <ListContainer>
              <HorizontalList items={data?.albums?.items} title={"Albums"} />
            </ListContainer>
          </>
        )}
      </Results>
    </>
  );
}

export default Search;
