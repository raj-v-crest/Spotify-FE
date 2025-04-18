import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { searchArtists } from "../services/spotifyService";
import InfoCard from "../components/InfoCard";
import Loader from "../components/Loader";
import "../global.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [loadingMore] = useState(false);

  const fetchArtists = async (searchQuery = "indian singers", page = 1) => {
    setLoading(true);
    const data = await searchArtists(searchQuery, page);
    setArtists((prev) => [...prev, ...data]);
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
        <Loader />
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 2, paddingBottom: "20px" }}>
            {artists.map((artist) => (
              <InfoCard
                key={artist.id}
                id={artist.id}
                image={artist.images[0]?.url}
                title={artist.name}
                subtitle={`Followers: ${artist.followers.total.toLocaleString()}`}
                isAvatar={true}
              />
            ))}
          </Box>
          {loadingMore && <Loader size={30} />}
        </>
      )}
    </div>
  );
};

export default Artists;
