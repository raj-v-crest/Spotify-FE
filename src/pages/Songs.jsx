import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { getBollywoodSongs } from "../services/spotifyService";
import InfoCard from "../components/InfoCard";
import "../global.css";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getBollywoodSongs();
      setSongs(data);
      setLoading(false);
    };
    fetchSongs();
  }, []);

  return (
    <div className="file-container">
      <Typography variant="h5" gutterBottom className="common-typography">
        Songs
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
          {songs.map((song) => (
            <InfoCard
              key={song.id}
              id={song.id}
              image={song.album.images[0]?.url}
              title={song.name}
              isAvatar={false}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Songs;
