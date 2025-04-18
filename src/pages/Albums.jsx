// src/pages/Albums.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { getBollywoodAlbums } from "../services/spotifyService";
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
            <Card key={album.id} sx={{ width: 200 }}>
              <CardMedia
                component="img"
                height="200"
                image={album.images[0]?.url}
                alt={album.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{album.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {album.artists.map((artist) => artist.name).join(", ")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Albums;
