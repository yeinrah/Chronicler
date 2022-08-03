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
    setParticipant([participants]);
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
        <Box>User in videoroom</Box>
        {participant && console.log(participant[0])}
        {participant[0] &&
          participant[0].map((item: any) => {
            return <Box key="item">{item}</Box>;
          })}
      </Box>
    </ParticipantBox>
  );
};

export default ParticipantBlock;
