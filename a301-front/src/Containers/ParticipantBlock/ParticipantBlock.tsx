import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import React from 'react';
import styles from './ParticipantBlock.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  people: number;
  openChat: boolean;
  openParticipant: boolean;
  setOpenParticipant: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParticipantBlock: React.FC<Props> = ({
  people,
  openChat,
  openParticipant,
  setOpenParticipant,
}) => {
  const ParticipantBox = styled(Box)({
    padding: '1px',
    border: '1px solid black',
    margin: '1px',
  });

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
          <Typography variant="h6">Participants({people + 1})</Typography>
          <CloseIcon
            onClick={() => setOpenParticipant(false)}
            sx={{ cursor: 'pointer' }}
          />
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
