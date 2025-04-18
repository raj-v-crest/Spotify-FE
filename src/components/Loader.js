// src/components/Loader.js
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = ({ size = 40, color = "" }) => {
  return (
    <Box className="loading-container">
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default Loader; // ✅ Important!
