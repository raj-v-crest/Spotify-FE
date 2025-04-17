import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Users from "./pages/Users";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";

const AppRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/songs" element={<Songs />} />
    <Route path="/users" element={<Users />} />
    <Route path="/artists" element={<Artists />} />
    <Route path="/albums" element={<Albums />} />
  </Routes>
);

export default AppRoutes;
