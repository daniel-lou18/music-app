import HorizontalList from "../components/HorizontalList";
import { useBrowse } from "../context/BrowseContext";
import TopBar from "../components/Containers/TopBar";
import NavBtns from "../components/UI-elements/NavBtns";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/UI-elements/Spinner";
import NavLinkItem from "../components/NavBar/NavLinkItem";
import LogoIcon from "../components/UI-elements/LogoIcon";

function Browse() {
  const { data, genre, dispatch, isLoading } = useBrowse();
  const { artists } = data;
  const { genre: genreUrl } = useParams();

  useEffect(() => {
    if (!genre) dispatch({ type: "browse/genre", payload: genreUrl });
  }, [genre, dispatch, genreUrl]);

  return (
    <>
      <NavLinkItem
        to={""}
        icon={<LogoIcon />}
        text={
          <h1>
            Spoti<span>Lite</span>
          </h1>
        }
        end={true}
        className="logoMobile"
      />
      <TopBar>
        <NavBtns />
      </TopBar>
      {isLoading && <Spinner />}
      {!isLoading && Object.keys(data).length !== 0 && (
        <HorizontalList
          items={artists.items}
          title={genre[0].toUpperCase() + genre.slice(1)}
          className="browse-category"
        />
      )}
    </>
  );
}

export default Browse;
