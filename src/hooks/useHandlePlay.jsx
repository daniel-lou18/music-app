import { useMusic } from "../context/MusicContext";

function useHandlePlay(item, isPlayingId, trackId) {
  const { dispatch } = useMusic();

  if (!item) return () => null;

  return function () {
    if (item.preview_url && isPlayingId !== trackId)
      dispatch({ type: "playing/set", payload: trackId });
  };
}

export default useHandlePlay;
