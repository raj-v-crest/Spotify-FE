import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { getBollywoodSongs } from "../services/spotifyService";
import MusicCard from "../components/MusicCard";
import "../global.css";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingUrl, setPlayingUrl] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getBollywoodSongs();
      setSongs(data);
      setLoading(false);
    };
    fetchSongs();
  }, []);

  const playPreview = (url) => {
    if (!url) return;
    if (audio && playingUrl === url) {
      audio.pause();
      setPlayingUrl(null);
      setAudio(null);
    } else {
      if (audio) audio.pause();
      const newAudio = new Audio(url);
      newAudio.play();
      setAudio(newAudio);
      setPlayingUrl(url);
    }
  };

  return (
    <div className="file-container">
      <Typography variant="h5" gutterBottom className="common-typography">
        Bollywood Songs
      </Typography>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              image={song.album.images[0]?.url}
              title={song.name}
              subtitle={song.artists.map((a) => a.name).join(", ")}
              onClick={() => playPreview(song.preview_url)}
              isClickable={!!song.preview_url}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Songs;
