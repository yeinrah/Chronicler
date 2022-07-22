import React from 'react';
import './MeetingRoom.module.css';
import { VideoPlayer } from '../../Containers';
import { Container, Grid } from '@mui/material';

const MeetingRoom = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: 'yellow', display: 'flex', flexWrap: 'wrap' }}
    >
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
      <VideoPlayer />
    </Container>
  );
};

export default MeetingRoom;
