// src/services/spotifyService.js
import axios from "axios";

const clientId = "59936df56d6040d392f140b61c1619fa";
const clientSecret = "32ed724a1f444426ab6a008dcf0f329f";

export const getAccessToken = async () => {
  const authString = btoa(`${clientId}:${clientSecret}`);

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    return null;
  }
};

export const searchArtists = async (query) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const bollywoodArtists = res.data.artists.items.filter((artist) =>
      artist.genres.some((genre) => genre.toLowerCase().includes("bollywood"))
    );

    // Sort them by followers descending
    bollywoodArtists.sort((a, b) => b.followers.total - a.followers.total);

    return bollywoodArtists;
  } catch (err) {
    console.error("Error searching artists:", err);
    return [];
  }
};

export const getBollywoodAlbums = async () => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=bollywood&type=album&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // You can also further filter by language if needed
    return res.data.albums.items;
  } catch (err) {
    console.error("Error fetching Bollywood albums:", err);
    return [];
  }
};

export const getBollywoodSongs = async () => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const res = await axios.get(
      "https://api.spotify.com/v1/search?q=bollywood&type=track&limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.tracks.items;
  } catch (err) {
    console.error("Error fetching Bollywood songs:", err);
    return [];
  }
};
