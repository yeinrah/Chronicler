import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './ParticipantBlock.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  people: number;
  openChat: boolean;
  openParticipant: boolean;
  setOpenParticipant: React.Dispatch<React.SetStateAction<boolean>>;
  participants: any;
}

const ParticipantBlock: React.FC<Props> = ({
  people,
  openChat,
  openParticipant,
  participants,
  setOpenParticipant,
}) => {
  const ParticipantBox = styled(Box)({
    padding: '1px',
    border: '0px solid black',
    margin: '1px',
  });
  const [participant, setParticipant] = useState(participants);
  useEffect(() => {
    setParticipant([participants]);
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
          height: '65%',
          overflow: 'scroll',
        }}
      >
        {participant[0] &&
          participant[0].map((item: any, index: any) => {
            let nickname = item.slice(8, item.length - 2);
            return <Box key={index}>{nickname}</Box>;
          })}
      </Box>
    </ParticipantBox>
  );
};

export default ParticipantBlock;
