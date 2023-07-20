/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

import { useAuth } from "./AuthContext";

const BASE_URL = "https://api.spotify.com/v1";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    data: [],
    query: "coltrane",
    error: "",
    isLoading: false,
    artistId: "",
    albumId: "",
    topResult: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "search/query":
        return { ...state, query: action.payload };
      case "loading":
        return { ...state, error: "", isLoading: true };
      case "loaded":
        return { ...state, data: action.payload, isLoading: false };
      case "error":
        if (action.payload.name === "AbortError") return state;
        return { ...state, error: action.payload.message, isLoading: false };
      case "artist/get":
        return { ...state, artistId: action.payload };
      case "album/get":
        return { ...state, albumId: action.payload };
      case "albums/loaded":
        return { ...state, data: { ...state.data, albums: action.payload } };

      case "albumTracks/loaded":
        return { ...state, data: { ...state.data, tracks: action.payload } };
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
      case "topResult/set":
        return { ...state, topResult: action.payload };

      default:
        return state;
    }
  };

  const [
    { data, query, error, isLoading, artistId, albumId, topResult },
    dispatch,
  ] = useReducer(reducer, initialState);

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
        const data = await res.json();
        console.log(data);
        dispatch({ type: "loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    };

    fetchMusic();
    return () => controller.abort();
  }, [token, query]);

  useEffect(() => {
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
        const data = await res.json();
        console.log(data);
        dispatch({ type: actionType, payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    }

    fetchArtist("albums?limit=5", "albums/loaded");
    fetchArtist("related-artists", "artists/loaded");
    fetchArtist("top-tracks?market=Fr", "tracks/loaded");
  }, [artistId, token]);

  useEffect(() => {
    if (!token || !albumId) return;

    async function fetchAlbum() {
      try {
        dispatch({ type: "loading" });
        const trackRes = await fetch(
          `${BASE_URL}/albums/${albumId}/tracks?market=fr&limit=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        const trackData = await trackRes.json();

        const albumRes = await fetch(
          `${BASE_URL}/albums/${albumId}?market=fr`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        const albumData = await albumRes.json();

        const data = {
          ...trackData,
          items: trackData.items.map((item) => {
            return { ...item, album: albumData };
          }),
        };
        dispatch({ type: "albumTracks/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    }

    fetchAlbum();
    // fetchAlbum("related-artists", "artists/loaded");
    // fetchAlbum("top-tracks?market=Fr", "tracks/loaded");
  }, [albumId, token]);

  return (
    <MusicContext.Provider
      value={{
        data,
        query,
        error,
        isLoading,
        artistId,
        albumId,
        topResult,
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
