import GoToBtn from "../GoToBtn";
import PlayTrackBtn from "../PlayTrackBtn/PlayTrackBtn";

function PlayBtn({ type, id, previewUrl }) {
  return (
    <>
      {(type === "artist" || type === "album") && (
        <GoToBtn type={type} id={id} />
      )}
      {type === "track" && <PlayTrackBtn previewUrl={previewUrl} id={id} />}
    </>
  );
}

export default PlayBtn;
