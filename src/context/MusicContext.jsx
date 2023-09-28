import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Fuse from "fuse.js";

import { useAuth } from "./AuthContext";

const BASE_URL = "https://api.spotify.com/v1";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    data: {},
    currentArtist: {},
    currentAlbum: {},
    query: "",
    error: "",
    isLoading: false,
    isPlayingId: "",
    artistId: "",
    albumId: "",
    topResult: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "query/updated": {
        return { ...state, query: action.payload };
      }
      case "search/query":
        return {
          ...state,
          query: action.payload,
          artistId: "",
          albumId: "",
          isPlayingId: "",
        };
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "loaded":
        return { ...state, data: action.payload, isLoading: false };
      case "error":
        if (action.payload.name === "AbortError") return state;
        return { ...state, error: action.payload.message, isLoading: false };
      case "currentArtist/artist-info/loaded":
        return { ...state, currentArtist: action.payload, isLoading: false };
      case "currentArtist/albums/loaded":
        return {
          ...state,
          currentArtist: { ...state.currentArtist, albums: action.payload },
          isLoading: false,
        };
      case "currentArtist/related-artists/loaded":
        return {
          ...state,
          currentArtist: {
            ...state.currentArtist,
            artists: action.payload.artists,
          },
          isLoading: false,
        };
      case "currentArtist/top-tracks/loaded":
        return {
          ...state,
          currentArtist: {
            ...state.currentArtist,
            tracks: action.payload.tracks,
          },
          isLoading: false,
        };
      case "currentAlbum/loaded":
        // const albumWithTrackImgs = { ...action.payload, tracks };
        return { ...state, currentAlbum: action.payload, isLoading: false };
      case "playing/set":
        return { ...state, isPlayingId: action.payload };
      case "topResult/set":
        return {
          ...state,
          topResult: action.payload,
          isPlayingId: "",
          isLoading: false,
        };
      case "reset":
        return { ...state, data: [], query: "", albumId: "", artistId: "" };
      default:
        return state;
    }
  };

  const [
    {
      data,
      currentArtist,
      currentAlbum,
      query,
      error,
      isLoading,
      isPlayingId,
      artistId,
      albumId,
      topResult,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // console.log(data);

  useEffect(() => {
    if (!query || !token) return;
    const controller = new AbortController();

    const fetchMusic = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(
          `${BASE_URL}/search?q=${query}&type=artist,track,album&limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
            signal: controller.signal,
          }
        );
        if (!res.ok)
          throw new Error(`Could not get music data (${res.status})`);
        const data = await res.json();
        dispatch({ type: "loaded", payload: data });
        dispatch({ type: "topResult/set", payload: getTopResult(data, query) });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    };

    fetchMusic();
    return () => controller.abort();
  }, [token, query]);

  const getArtist = useCallback(
    async (artistId) => {
      if (!token || !artistId) return;

      async function fetchArtist(source, actionType) {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(`${BASE_URL}/artists/${artistId}/${source}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
          });
          if (!res.ok)
            throw new Error(`Could not get artist data (${res.status})`);
          const data = await res.json();
          dispatch({ type: actionType, payload: data });
        } catch (err) {
          console.error(err);
          dispatch({ type: "error", payload: err });
        }
      }

      await fetchArtist("", "currentArtist/artist-info/loaded");
      await fetchArtist("albums?limit=10", "currentArtist/albums/loaded");
      await fetchArtist(
        "related-artists",
        "currentArtist/related-artists/loaded"
      );
      await fetchArtist(
        "top-tracks?market=Fr",
        "currentArtist/top-tracks/loaded"
      );
    },
    [token]
  );

  const getAlbum = useCallback(
    async (albumId) => {
      if (!token || !albumId) return;

      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/albums/${albumId}?market=fr`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token})}`,
          },
        });
        if (!res.ok)
          throw new Error(`Could not get album data (${res.status})`);
        const data = await res.json();
        dispatch({ type: "currentAlbum/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    },
    [token]
  );

  return (
    <MusicContext.Provider
      value={{
        data,
        currentArtist,
        currentAlbum,
        query,
        error,
        isLoading,
        isPlayingId,
        artistId,
        albumId,
        topResult,
        getArtist,
        getAlbum,
        dispatch,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};

function getTopResult(items, query) {
  const itemsArray = [
    ...items.artists.items,
    ...items.tracks.items.slice(0, 5),
    ...items.albums.items,
  ];
  const options = { includeScore: true, keys: ["name"] };
  const fuse = new Fuse(itemsArray, options);
  const result = fuse.search(query);

  const exactMatches = itemsArray
    .filter((item) => item.name.toLowerCase().includes(query))
    .sort((a, b) => b.popularity - a.popularity);
  if (exactMatches.length > 0) return exactMatches[0];

  const exactReversedMatches = itemsArray
    .filter((item) =>
      item.name.toLowerCase().includes(query.split(" ").toReversed().join(" "))
    )
    .sort((a, b) => b.popularity - a.popularity);
  if (exactReversedMatches.length > 0) return exactReversedMatches[0];

  return itemsArray.find((item) => item.name.toLowerCase().includes(query));
}
