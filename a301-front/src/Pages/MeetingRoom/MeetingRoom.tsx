import React from 'react';
import './MeetingRoom.module.css';
import { ChatBlock, ParticipantBlock, VideoPlayer } from '../../Containers';
import { Container, Grid, Stack } from '@mui/material';

const MeetingRoom = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
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
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
        spacing={0}
      >
        <ParticipantBlock />
        <ChatBlock />
      </Stack>
    </Stack>
  );
};

export default MeetingRoom;
