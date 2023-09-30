import { getToken } from "./apiToken";

const BASE_URL = "https://api.spotify.com/v1";
const token = await getToken();

export async function getNewReleases() {
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
  return data.albums.items;
}

export async function getPopularTracks() {
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
  console.log(data);
  const dataWithAudio = data.tracks
    .filter((track) => track.preview_url)
    .slice(0, 5);
  return dataWithAudio;
}
