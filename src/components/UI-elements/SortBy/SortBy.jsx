import { useLocation, useSearchParams } from "react-router-dom";
import SelectMenu from "../SelectMenu/SelectMenu";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentValue =
    searchParams.get("sortBy") ||
    (location.pathname.includes("app/favorites/") ? "name-asc" : "rating-desc");
  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  console.log(currentValue);
  return (
    <SelectMenu
      options={options}
      onChange={handleChange}
      value={currentValue}
    />
  );
}

export default SortBy;
