// src/pages/Artists.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { searchArtists } from "../services/spotifyService";
import "../global.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchArtists = async (searchQuery = "indian singers", page = 1) => {
    setLoading(true);
    const data = await searchArtists(searchQuery, page); // Adjust your searchArtists function to handle pagination
    setArtists((prevArtists) => [...prevArtists, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArtists("indian singers", page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(true);
    fetchArtists("indian singers", page + 1);
    setLoadingMore(false);
  };

  return (
    <div className="file-container">
      <Typography variant="h5" className="common-typography" gutterBottom>
        Indian Artists
      </Typography>

      {loading && page === 1 ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto", // Allows horizontal scrolling
              gap: 2, // Space between the boxes
              paddingBottom: "20px", // To give space for scrolling if needed
            }}
          >
            {artists.map((artist) => (
              <Box
                key={artist.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: "16px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #2ecc71", // Adding border color
                  transition: "all 0.3s ease",
                  width: "200px", // Fixed width for the box
                  flexShrink: 0, // Prevents the box from shrinking
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    borderColor: "#27ae60", // Darker border on hover
                  },
                }}
              >
                <Avatar
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  sx={{
                    width: 120,
                    height: 120,
                    marginBottom: "16px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "3px solid #2ecc71", // Green border around the image
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {artist.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Followers: {artist.followers.total.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Genres: {artist.genres.join(", ")}
                </Typography>
              </Box>
            ))}
          </Box>

          {loadingMore && <CircularProgress />}
        </>
      )}
    </div>
  );
};

export default Artists;
