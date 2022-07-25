import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './ParticipantBlock.module.css';
import CloseIcon from '@mui/icons-material/Close';

const ParticipantBlock = () => {
  const ParticipantBox = styled(Box)({
    padding: '1px',
    border: '1px solid black',
    margin: '1px',
  });

  return (
    <ParticipantBox width="20vw" height="30vh">
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'var(--fontAccent-color)',
          }}
        >
          <Typography variant="h6">Participants(#)</Typography>
          <CloseIcon />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          color: 'var(--eleBase-color)',
          padding: '10px',
          height: '90%',
          overflow: 'scroll',
        }}
      >
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
        <Box>User nickname, mic on, camera on</Box>
      </Box>
    </ParticipantBox>
  );
};

export default ParticipantBlock;
