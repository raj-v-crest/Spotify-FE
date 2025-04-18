import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { searchArtists } from "../services/spotifyService";
import MusicCard from "../components/MusicCard";
import "../global.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await searchArtists("bollywood");
      setArtists(data);
      setLoading(false);
    };

    fetchArtists();
  }, []);

  return (
    <div className="file-container">
      <Typography variant="h5" gutterBottom className="common-typography">
        Bollywood Artists
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {artists.map((artist) => (
            <MusicCard
              key={artist.id}
              image={artist.images[0]?.url}
              title={artist.name}
              subtitle={`${artist.followers.total.toLocaleString()} followers`}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Artists;
