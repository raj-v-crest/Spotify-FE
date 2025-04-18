import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
import AppRoutes from "./routes";
import "./global.css"; // Import global CSS

const App = () => (
  <Box className="App-container">
    <Header />
    <Box className="App-content">
      <Sidebar />
      <Box component="main" className="App-main">
        <AppRoutes />
      </Box>
    </Box>
    {/* <Footer /> */}
  </Box>
);

export default App;
