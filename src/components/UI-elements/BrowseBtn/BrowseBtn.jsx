import { useBrowse } from "../../../context/BrowseContext";
import ArrowIcon from "../ArrowIcon";

import { useNavigate } from "react-router-dom";

function BrowseBtn({ genreName }) {
  const { dispatch: dispatchBrowse } = useBrowse();
  const navigate = useNavigate();

  const handleBrowse = () => {
    dispatchBrowse({ type: "browse/genre", payload: genreName });
    navigate(`/app/browse/${genreName}`);

    window.scrollTo(0, 0);
  };

  return (
    <div className={`playBtn`} onClick={handleBrowse}>
      <ArrowIcon />
    </div>
  );
}

export default BrowseBtn;
