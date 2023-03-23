/* eslint-disable */
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import data from "./trust.json";

const UserDataTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Likes Received</TableCell>
            <TableCell>Likes Given</TableCell>
            <TableCell>Topic Count</TableCell>
            <TableCell>Post Count</TableCell>
            <TableCell>Topics Entered</TableCell>
            <TableCell>Posts Read</TableCell>
            <TableCell>Days Visited</TableCell>
            <TableCell>Time Read</TableCell>
            <TableCell>User Info</TableCell>
            <TableCell>User TrustLevel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data?.directory_items.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.likes_received}</TableCell>
              <TableCell>{user.likes_given}</TableCell>
              <TableCell>{user.topic_count}</TableCell>
              <TableCell>{user.post_count}</TableCell>
              <TableCell>{user.topics_entered}</TableCell>
              <TableCell>{user.posts_read}</TableCell>
              <TableCell>{user.days_visited}</TableCell>
              <TableCell>{user.time_read}</TableCell>
              <TableCell>
                {/* <img src={user.user.avatar_template.replace('{size}', '40')} alt="avatar" /> */}
                <span>{user.user.username}</span>
              </TableCell>
              <TableCell>
                <span>{user.user.trust_level}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDataTable;
