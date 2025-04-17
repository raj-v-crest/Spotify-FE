// src/pages/Artists.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { searchArtists } from "../services/spotifyService";
import "../global.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await searchArtists("indian singers");
      setArtists(data);
      setLoading(false);
    };

    fetchArtists();
  }, []);

  return (
    <div className="file-container">
      <Typography variant="h5" className="common-typography" gutterBottom>
        Indian Artists
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#2ecc71" }}>
              <TableRow>
                <TableCell className="table-cell-header">Image</TableCell>
                <TableCell className="table-cell-header">Name</TableCell>
                <TableCell className="table-cell-header">Followers</TableCell>
                <TableCell className="table-cell-header">Genres</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <Avatar src={artist.images[0]?.url} alt={artist.name} />
                  </TableCell>
                  <TableCell>{artist.name}</TableCell>
                  <TableCell>
                    {artist.followers.total.toLocaleString()}
                  </TableCell>
                  <TableCell>{artist.genres.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Artists;
