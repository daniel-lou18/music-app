import { useSearchParams } from "react-router-dom";

export function useFavoriteSongsOperations(data) {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("subscription") || "all";
  let filteredTracks;
  if (filterValue === "all") filteredTracks = data;
  if (filterValue === "free")
    filteredTracks = data.filter((track) => track.preview_url);
  if (filterValue === "paid")
    filteredTracks = data.filter((track) => !track.preview_url);

  const sortValue = searchParams.get("sortBy") || "name-asc";
  let [sortField, sortOrder] = sortValue.split("-");
  const modifier = sortOrder === "asc" ? 1 : -1;
  filteredTracks.sort((a, b) => {
    if (sortField.startsWith("artist")) {
      if (a?.artists?.at(0)?.name === b?.artists?.at(0)?.name) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (a?.artists?.at(0)?.name < b?.artists?.at(0)?.name)
        return -1 * modifier;
      if (a?.artists?.at(0)?.name > b?.artists?.at(0)?.name)
        return 1 * modifier;
      return 0;
    }

    if (a[sortField] < b[sortField]) return -1 * modifier;
    if (a[sortField] > b[sortField]) return 1 * modifier;
    if (a[sortField] === b[sortField]) {
      if (a?.artists?.at(0)?.name < b?.artists?.at(0)?.name) return -1;
      if (a?.artists?.at(0)?.name > b?.artists?.at(0)?.name) return 1;
      return 0;
    }
    return 0;
  });

  return filteredTracks;
}

export function useFavoriteAlbumsOperations(data) {
  const [searchParams] = useSearchParams();
  let filteredTracks = data;

  const sortValue = searchParams.get("sortBy") || "name-asc";
  let [sortField, sortOrder] = sortValue.split("-");
  const modifier = sortOrder === "asc" ? 1 : -1;
  filteredTracks.sort((a, b) => {
    if (sortField.startsWith("artist")) {
      if (a?.artists?.at(0)?.name === b?.artists?.at(0)?.name) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      if (a?.artists?.at(0)?.name < b?.artists?.at(0)?.name)
        return -1 * modifier;
      if (a?.artists?.at(0)?.name > b?.artists?.at(0)?.name)
        return 1 * modifier;
      return 0;
    }

    if (a[sortField] < b[sortField]) return -1 * modifier;
    if (a[sortField] > b[sortField]) return 1 * modifier;
    if (a[sortField] === b[sortField]) {
      if (a?.artists?.at(0)?.name < b?.artists?.at(0)?.name) return -1;
      if (a?.artists?.at(0)?.name > b?.artists?.at(0)?.name) return 1;
      return 0;
    }
    return 0;
  });

  return filteredTracks;
}
