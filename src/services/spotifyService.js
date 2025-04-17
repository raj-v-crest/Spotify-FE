// src/services/spotifyService.js
import axios from "axios";

const clientId = "59936df56d6040d392f140b61c1619fa";
const clientSecret = "32ed724a1f444426ab6a008dcf0f329f";

const getAccessToken = async () => {
  console.log(clientId, "jjjjjjjjjjjjjj");
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
    console.log(response.data.access_token, "response.data.access_token");
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
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.artists.items;
  } catch (err) {
    console.error("Error searching artists:", err);
    return [];
  }
};
