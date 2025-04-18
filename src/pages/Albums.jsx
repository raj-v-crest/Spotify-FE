import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { getBollywoodAlbums } from "../services/spotifyService";
import MusicCard from "../components/MusicCard";
import "../global.css";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBollywoodAlbums = async () => {
      const data = await getBollywoodAlbums();
      setAlbums(data);
      setLoading(false);
    };

    fetchBollywoodAlbums();
  }, []);

  return (
    <div className="file-container">
      <Typography variant="h5" gutterBottom className="common-typography">
        Bollywood Albums
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {albums.map((album) => (
            <MusicCard
              key={album.id}
              image={album.images[0]?.url}
              title={album.name}
              subtitle={album.artists.map((a) => a.name).join(", ")}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Albums;
