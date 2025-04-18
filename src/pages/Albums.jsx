import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { getBollywoodAlbums } from "../services/spotifyService";
import InfoCard from "../components/InfoCard";
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
        Albums
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
          {albums.map((album) => (
            <InfoCard
              key={album.id}
              id={album.id}
              image={album.images[0]?.url}
              title={album.name}
              isAvatar={true}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Albums;
