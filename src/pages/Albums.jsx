// src/pages/Albums.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  CardContent,
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
        Albums
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            paddingBottom: "20px",
          }}
        >
          {albums.map((album) => (
            <Box
              key={album.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "black",
                // padding: "12.5px",
                paddingTop: "12.5px",
                paddingRight: "12.5px",
                paddingLeft: "12.5px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                border: "2px solid #1db954",
                transition: "all 0.3s ease",
                width: "200px",
                flexShrink: 0,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                  borderColor: "#27ae60",
                },
              }}
            >
              <Avatar
                src={album.images[0]?.url}
                alt={album.name}
                sx={{
                  width: 200,
                  height: 200,
                  marginBottom: "16px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "3px solid #1db954",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#1db954",
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {album.name.length > 17
                    ? album.name.slice(0, 17) + "..."
                    : album.name}
                </Typography>
              </CardContent>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Albums;
