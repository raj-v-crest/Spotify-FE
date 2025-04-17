import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "../global.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.address.city.toLowerCase().includes(search)
    );
  });

  const handleChangePage = (direction) => {
    const newPage =
      direction === "next"
        ? Math.min(page + 1, Math.floor(filteredUsers.length / rowsPerPage))
        : Math.max(page - 1, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0); // Reset to first page
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="file-container">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" className="common-typography" sx={{ mr: 2 }}>
          Users
        </Typography>

        <Box>
          <TextField
            placeholder="Search here"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: "12px",
                backgroundColor: "#fff",
              },
            }}
          />
        </Box>
      </Box>

      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : (
        <>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead sx={{ backgroundColor: "#2ecc71" }}>
                <TableRow>
                  <TableCell className="table-cell-header">ID</TableCell>
                  <TableCell className="table-cell-header">Name</TableCell>
                  <TableCell className="table-cell-header">Username</TableCell>
                  <TableCell className="table-cell-header">Email</TableCell>
                  <TableCell className="table-cell-header">City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address.city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No matching users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination inside the table box */}
            <Box className="pagination-container">
              {/* Left - Rows per page */}
              <Box className="rows-per-page">
                <Typography>Rows per page:</Typography>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  variant="standard"
                  className="select-custom"
                >
                  {[5, 10, 25, 50, 100].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Right - Pagination info and arrows */}
              <Box className="pagination-info">
                <Typography>
                  {page * rowsPerPage + 1}–
                  {Math.min((page + 1) * rowsPerPage, filteredUsers.length)} of{" "}
                  {filteredUsers.length}
                </Typography>
                <IconButton
                  onClick={() => handleChangePage("prev")}
                  disabled={page === 0}
                >
                  <KeyboardArrowLeft sx={{ color: "#111" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleChangePage("next")}
                  disabled={(page + 1) * rowsPerPage >= filteredUsers.length}
                >
                  <KeyboardArrowRight sx={{ color: "#111" }} />
                </IconButton>
              </Box>
            </Box>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default Users;
