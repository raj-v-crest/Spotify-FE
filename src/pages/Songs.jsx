import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { getBollywoodSongs } from "../services/spotifyService"; // Import the service function
import "../global.css"; // Import global CSS

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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            paddingBottom: "20px",
          }}
        >
          {songs.map((song) => (
            <Box
              key={song.id}
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
              <CardMedia
                component="img"
                height="200"
                image={song.album.images[0]?.url}
                alt={song.name}
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
                    display: "block", // Make sure it's a block element (text inside a block)
                    width: "100%", // Ensure it takes the full width of the parent box
                    overflow: "hidden", // Hide the overflow text
                    textOverflow: "ellipsis", // Apply ellipsis when text overflows
                    whiteSpace: "nowrap", // Prevent text from wrapping
                  }}
                >
                  {song.name.length > 17
                    ? song.name.slice(0, 17) + "..."
                    : song.name}
                </Typography>

                {/* <Typography
                  variant="body2"
                  color="white"
                  sx={{ textAlign: "center" }}
                >
                  {song.artists.map((a) => a.name).join(", ")}
                </Typography> */}
              </CardContent>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Songs;
