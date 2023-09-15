import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const HomeContext = createContext();

const BASE_URL = "https://api.spotify.com/v1";

export const HomeProvider = ({ children }) => {
  const { token } = useAuth();

  const initialState = {
    newReleasesData: [],
    popularTracksData: [],
    errorReleases: "",
    errorTracks: "",
    isLoadingReleases: false,
    isLoadingTracks: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "new-releases/loading":
        return { ...state, errorReleases: "", isLoadingReleases: true };
      case "popular-tracks/loading":
        return { ...state, errorTracks: "", isLoadingTracks: true };
      case "new-releases/loaded":
        return {
          ...state,
          newReleasesData: action.payload,
          isLoadingReleases: false,
        };
      case "popular-tracks/loaded":
        const tracksWithImgs = action.payload.map((track) => {
          return { ...track, images: track.album.images };
        });
        return {
          ...state,
          popularTracksData: tracksWithImgs,
          isLoadingTracks: false,
        };
      case "new-releases/error":
        return {
          ...state,
          errorReleases: action.payload.message,
          isLoadingReleases: false,
        };
      case "popular-tracks/error":
        return {
          ...state,
          errorTracks: action.payload.message,
          isLoadingTracks: false,
        };
      default:
        return state;
    }
  };

  const [
    {
      newReleasesData,
      popularTracksData,
      isLoadingTracks,
      isLoadingReleases,
      errorTracks,
      errorReleases,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // console.log(popularTracksData);

  useEffect(() => {
    if (!token) return;

    const getNewReleases = async () => {
      try {
        dispatch({ type: "new-releases/loading" });
        const res = await fetch(
          `${BASE_URL}/browse/new-releases?country=FR&limit=25`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token})}`,
            },
          }
        );
        if (!res.ok)
          throw new Error(`Could not retrieve new releases (${res.status})`);
        const data = await res.json();
        dispatch({ type: "new-releases/loaded", payload: data.albums.items });
      } catch (err) {
        console.error(err);
        dispatch({ type: "new-releases/error", payload: err });
      }
    };

    getNewReleases();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const getPopularTracks = async () => {
      try {
        dispatch({ type: "popular-tracks/loading" });
        const res = await fetch(
          `${BASE_URL}/recommendations?limit=25&market=FR&seed_genres=pop&target_popularity=90`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok)
          throw new Error(`Could not retrieve popular songs (${res.status})`);
        const data = await res.json();
        const dataWithAudio = data.tracks
          .filter((track) => track.preview_url)
          .slice(0, 5);
        dispatch({ type: "popular-tracks/loaded", payload: dataWithAudio });
      } catch (err) {
        console.error(err);
        dispatch({ type: "popular-tracks/error", payload: err });
      }
    };

    getPopularTracks();
  }, [token]);

  return (
    <HomeContext.Provider
      value={{
        newReleasesData,
        popularTracksData,
        isLoadingReleases,
        isLoadingTracks,
        errorReleases,
        errorTracks,
        dispatch,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  return useContext(HomeContext);
};
