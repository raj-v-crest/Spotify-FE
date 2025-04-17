import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import {
  Dashboard,
  LibraryMusic,
  People,
  RecordVoiceOver,
} from "@mui/icons-material";
import AlbumIcon from "@mui/icons-material/Album";

import { NavLink, useLocation } from "react-router-dom";
import "../global.css";

const Sidebar = () => {
  const location = useLocation();

  // Helper function to detect active route
  const isActive = (path) => location.pathname === path;

  return (
    <Drawer variant="permanent" className="custom-drawer">
      {/* Logo Section */}
      <Box className="box-logo">
        <img
          className="box-logo-img"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png"
          alt="Logo"
        />
      </Box>

      {/* Menu List */}
      <List className="sidebar-list">
        <ListItem
          button
          component={NavLink}
          to="/dashboard"
          exact
          className="sidebar-item"
        >
          <ListItemIcon>
            <Dashboard
              sx={{ color: isActive("/dashboard") ? "#1DB954" : "#fff" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{ color: isActive("/dashboard") ? "#1DB954" : "#fff" }}
          />
        </ListItem>

        <ListItem
          button
          component={NavLink}
          to="/songs"
          className="sidebar-item"
        >
          <ListItemIcon>
            <LibraryMusic
              sx={{ color: isActive("/songs") ? "#1DB954" : "#fff" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Songs"
            sx={{ color: isActive("/songs") ? "#1DB954" : "#fff" }}
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/artists"
          className="sidebar-item"
        >
          <ListItemIcon>
            <RecordVoiceOver
              sx={{ color: isActive("/artists") ? "#1DB954" : "#fff" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Artists"
            sx={{ color: isActive("/artists") ? "#1DB954" : "#fff" }}
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/albums"
          className="sidebar-item"
        >
          <ListItemIcon>
            <AlbumIcon
              sx={{ color: isActive("/albums") ? "#1DB954" : "#fff" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Albums"
            sx={{ color: isActive("/albums") ? "#1DB954" : "#fff" }}
          />
        </ListItem>

        <ListItem
          button
          component={NavLink}
          to="/users"
          className="sidebar-item"
        >
          <ListItemIcon>
            <People sx={{ color: isActive("/users") ? "#1DB954" : "#fff" }} />
          </ListItemIcon>
          <ListItemText
            primary="Users"
            sx={{ color: isActive("/users") ? "#1DB954" : "#fff" }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
