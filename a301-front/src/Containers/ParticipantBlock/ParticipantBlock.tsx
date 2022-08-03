import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './ParticipantBlock.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  openChat: boolean;
  openParticipant: boolean;
  participants: any;
}

const ParticipantBlock: React.FC<Props> = ({
  openChat,
  openParticipant,
  participants,
}) => {
  const ParticipantBox = styled(Box)({
    padding: '1px',
    border: '1px solid black',
    margin: '1px',
  });
  const [participant, setParticipant] = useState(participants);
  useEffect(() => {
    console.log('asdadsadasdasda');
    setParticipant([...participant, participants]);
    console.log(participant);
  }, [participants]);
  return (
    <ParticipantBox
      width="20vw"
      sx={{ borderBottom: 0 }}
      className={
        openParticipant
          ? openChat
            ? styles.withChat
            : styles.onlyParticipant
          : styles.noParticipant
      }
    >
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
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <Box>User nickname, mic on, camera on</Box>
        {/* <Box>{participant}</Box> */}
        {participant &&
          participant.map((item: any) => {
            return <Box>{item}</Box>;
          })}
      </Box>
    </ParticipantBox>
  );
};

export default ParticipantBlock;
