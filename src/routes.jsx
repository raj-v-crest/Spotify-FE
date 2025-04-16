import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Users from "./pages/Users";

const AppRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/songs" element={<Songs />} />
    <Route path="/users" element={<Users />} />
  </Routes>
);

export default AppRoutes;
