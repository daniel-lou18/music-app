const BASE_URL = "http://localhost:3000";

export const getFavorites = async () => {
  const res = await fetch(`${BASE_URL}/favorites`);
  if (!res.ok) throw new Error(`Could not fetch favorites (${res.status})`);
  const data = await res.json();
  return data;
};

export const addFavorite = async (item) => {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item }),
  });
  if (!res.ok)
    throw new Error(`Could not add item to Favorites (${res.status})`);
  const data = await res.json();
  return data;
};

export const removeFavorite = async (id) => {
  const res = await fetch(`${BASE_URL}/favorites/${id}`, {
    method: "DELETE",
  });
  if (!res.ok)
    throw new Error(`Could not remove item from Favorites (${res.status})`);
  const data = await res.json();
  return data;
};
