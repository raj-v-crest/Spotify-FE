import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar position="fixed">
    <Toolbar className="Toolbar-header">
      <Box className="header-title-box">
        <Typography variant="h6">Spotify Admin</Typography>
      </Box>
    </Toolbar>
    {/* </div> */}
  </AppBar>
);

export default Header;
