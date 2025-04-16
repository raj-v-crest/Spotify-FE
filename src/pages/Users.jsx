import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import "../global.css"; // Import global CSS

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="file-container">
      <Typography variant="h5" gutterBottom className="common-typography">
        Users
      </Typography>

      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : (
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell className="table-cell-header">ID</TableCell>
                <TableCell className="table-cell-header">Name</TableCell>
                <TableCell className="table-cell-header">Username</TableCell>
                <TableCell className="table-cell-header">Email</TableCell>
                <TableCell className="table-cell-header">City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Users;
