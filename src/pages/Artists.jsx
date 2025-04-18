import React, { useEffect, useState } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import { searchArtists } from "../services/spotifyService";
import Loader from "../components/Loader"; // ⬅️ Import loader
import "../global.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [loadingMore] = useState(false);

  const fetchArtists = async (searchQuery = "indian singers", page = 1) => {
    setLoading(true);
    const data = await searchArtists(searchQuery, page);
    setArtists((prevArtists) => [...prevArtists, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArtists("indian singers", page);
  }, [page]);

  return (
    <div className="file-container">
      <Typography variant="h5" className="common-typography" gutterBottom>
        Indian Artists
      </Typography>

      {loading && page === 1 ? (
        <Loader /> // ⬅️ Use reusable loader
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              paddingBottom: "20px",
            }}
          >
            {artists.map((artist) => (
              <Box
                key={artist.id}
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
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  sx={{
                    width: 200,
                    height: 200,
                    marginBottom: "16px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "3px solid #1db954",
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#1db954" }}
                >
                  {artist.name}
                </Typography>
                <Typography variant="body2" color="white" gutterBottom>
                  Followers: {artist.followers.total.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>

          {loadingMore && <Loader size={30} />}
        </>
      )}
    </div>
  );
};

export default Artists;
