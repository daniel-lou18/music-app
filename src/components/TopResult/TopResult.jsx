/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// import { useAuth } from "../../context/AuthContext";

// const BASE_URL = "https://api.spotify.com/v1";

function TopResult({ items, query }) {
  useEffect(() => {
    const itemsArray = [
      ...items.albums.items,
      ...items.artists.items,
      ...items.tracks.items,
    ];

    itemsArray.forEach((item) => {
      if (item.name.toLowerCase().includes(query)) console.log(item);
    });
  }, [items, query]);

  // const topAlbum = items.albums.items[0].name;
  // const topArtist = items.artists.items[0].name;
  // const topTrack = items.tracks.items[0].name;
  // console.log("album: " + topAlbum);
  // console.log("artist: " + topArtist);
  // console.log("track: " + topTrack);

  // const { token } = useAuth();

  // useEffect(() => {
  //   if (albums.items[0].length < 1) return;
  //   const fetchMusic = async () => {
  //     try {
  //       const res = await fetch(`${BASE_URL}/albums/${albums.items[0].id}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token})}`,
  //         },
  //       });
  //       const data = await res.json();
  //       console.log(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchMusic();
  // }, [token, albums.items]);

  return <div>{items.albums.items[0].name}</div>;
}

export default TopResult;
