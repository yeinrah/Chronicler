import React from 'react';
import styles from './VideoPlayer.module.css';
import { Grid, Typography, Paper, styled } from '@mui/material';
import UserVideoComponent from '../UserVideoComponent/UserVideoComponent';

const VideoPlayer = () => {
  const VideoPaper = styled(Paper)({
    padding: '1px',
    border: '1px solid black',
    margin: '1px',
  });

  return (
    <VideoPaper
      sx={{ width: { xs: '100%', sm: '100%', md: '49%', lg: '33%' } }}
    >
      <Grid>
        <Typography variant="h5" gutterBottom>
          Name
        </Typography>
        <UserVideoComponent />
      </Grid>
    </VideoPaper>
  );
};

export default VideoPlayer;
