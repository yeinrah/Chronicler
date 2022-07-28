import React, { useState } from 'react';
import styles from './MeetingRoom.module.css';
import { OpenVidu } from 'openvidu-browser';
import {
  ChatBlock,
  MeetingFooter,
  ParticipantBlock,
  VideoPlayer,
} from '../../Containers';
import { Container, Grid, Stack } from '@mui/material';

const MeetingRoom = () => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [openParticipant, setOpenParticipant] = useState<boolean>(false);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(false);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Container maxWidth="xl" sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
          <ParticipantBlock
            openChat={openChat}
            openParticipant={openParticipant}
          />
          <ChatBlock openChat={openChat} openParticipant={openParticipant} />
        </Stack>
      </Stack>
      <MeetingFooter
        openChat={openChat}
        openParticipant={openParticipant}
        micOn={micOn}
        cameraOn={cameraOn}
        setOpenChat={setOpenChat}
        setOpenParticipant={setOpenParticipant}
        setMicOn={setMicOn}
        setCameraOn={setCameraOn}
      />
    </>
  );
};

export default MeetingRoom;
