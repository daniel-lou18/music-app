const SPOTIFY_URL = "https://accounts.spotify.com/api/token";
const body =
  "grant_type=client_credentials&client_id=625e44fdf4c54d3ab62a5d1c95e3f353&client_secret=9401a23a8e6c47bdac04f93de44f7890";

export async function getToken() {
  const res = await fetch(`${SPOTIFY_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });
  if (!res.ok) throw new Error(`Could not get an access token (${res.status})`);
  const data = await res.json();
  return data.access_token;
}
