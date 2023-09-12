import { createContext, useContext, useEffect, useReducer } from "react";
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
      case "artist/get":
        return {
          ...state,
          artistId: action.payload,
          isPlayingId: "",
          albumId: "",
        };
      case "album/get":
        return {
          ...state,
          albumId: action.payload,
          isPlayingId: "",
          artistId: "",
        };
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
        return { ...state, currentAlbum: action.payload, isLoading: false };
      case "albums/loaded":
        return {
          ...state,
          data: { ...state.data, albums: action.payload },
          isLoading: false,
        };

      case "albumTracks/loaded":
        return {
          ...state,
          data: { ...state.data, tracks: action.payload },
          isLoading: false,
        };
      case "artists/loaded":
        return {
          ...state,
          data: {
            ...state.data,
            artists: {
              ...state.data.artists,
              items: action.payload.artists?.slice(0, 5),
            },
          },
          isLoading: false,
        };
      case "tracks/loaded":
        return {
          ...state,
          data: {
            ...state.data,
            tracks: {
              ...state.data.tracks,
              items: action.payload.tracks?.slice(0, 5),
            },
          },
        };
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
  console.log(currentAlbum);

  useEffect(() => {
    if (!query || !token) return;
    const controller = new AbortController();

    const fetchMusic = async () => {
      try {
        dispatch({ type: "loading" });
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
        if (!res.ok)
          throw new Error(`Could not get music data (${res.status})`);
        const data = await res.json();
        console.log(data);
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

  const getArtist = (artistId) => {
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
        console.log(data);
        dispatch({ type: actionType, payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    }

    fetchArtist("", "topResult/set");
    fetchArtist("albums?limit=5", "currentArtist/albums/loaded");
    fetchArtist("related-artists", "currentArtist/related-artists/loaded");
    fetchArtist("top-tracks?market=Fr", "currentArtist/top-tracks/loaded");
  };

  const getAlbum = async (albumId) => {
    if (!token || !albumId) return;

    try {
      dispatch({ type: "loading" });
      // const trackRes = await fetch(
      //   `${BASE_URL}/albums/${albumId}/tracks?market=fr`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token})}`,
      //     },
      //   }
      // );
      // if (!trackRes.ok)
      //   throw new Error(`Could not get album tracks (${trackRes.status})`);
      // const trackData = await trackRes.json();

      const res = await fetch(`${BASE_URL}/albums/${albumId}?market=fr`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token})}`,
        },
      });
      if (!res.ok) throw new Error(`Could not get album data (${res.status})`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "topResult/set", payload: data });
      dispatch({ type: "currentAlbum/loaded", payload: data });

      // const data_ = {
      //   ...trackData,
      //   items: trackData.items.map((item) => {
      //     return { ...item, album: data };
      //   }),
      // };
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  };

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
    ...items.tracks.items,
    ...items.albums.items,
  ];
  const options = { includeScore: true, keys: ["name"] };
  const fuse = new Fuse(itemsArray, options);
  const result = fuse.search(query);
  console.log(query, "...", result);

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
