import React from 'react';
import styles from './MeetingFooter.module.css';
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import LogoutIcon from '@mui/icons-material/Logout';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';

interface Props {
  openChat: boolean;
  openParticipant: boolean;
  micOn: boolean;
  cameraOn: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenParticipant: React.Dispatch<React.SetStateAction<boolean>>;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraOn: React.Dispatch<React.SetStateAction<boolean>>;
  leaveSession: any;
  // destroySession: any;
}

const MeetingFooter: React.FC<Props> = ({
  openChat,
  openParticipant,
  micOn,
  cameraOn,
  setOpenChat,
  setOpenParticipant,
  setMicOn,
  setCameraOn,
  leaveSession,
  // destroySession,
}) => {
  const FootBar = styled(Toolbar)({
    display: 'flex',
    gap: 30,
  });
  return (
    <AppBar
      position="fixed"
      sx={{ top: 'auto', bottom: 0, backgroundColor: 'var(--bgExtra-color)' }}
    >
      <FootBar>
        <Tooltip title={micOn ? 'Mic On' : 'Mic Off'} placement="top" arrow>
          <IconButton
            color="inherit"
            className={micOn ? styles.micCameraBtn : styles.micCameraBtnOff}
            onClick={() => {
              setMicOn(!micOn);
            }}
          >
            <MicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={cameraOn ? 'Camera On' : 'Camera Off'}
          placement="top"
          arrow
        >
          <IconButton
            color="inherit"
            className={cameraOn ? styles.micCameraBtn : styles.micCameraBtnOff}
            onClick={() => {
              console.log('??????????????');
              setCameraOn(!cameraOn);
            }}
          >
            <VideocamIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Leave Room" placement="top" arrow>
          <IconButton color="inherit" onClick={leaveSession}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close Room" placement="top" arrow>
          <IconButton color="inherit">
            <PhonelinkEraseIcon />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 0.8 }} />
        <Box component="div" sx={{ display: 'inline' }}>
          This is subtitle
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip
          title={openParticipant ? 'Close Participants' : 'See Participants'}
          placement="top"
          arrow
        >
          <IconButton
            color="inherit"
            onClick={() => setOpenParticipant(!openParticipant)}
          >
            <GroupsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={openChat ? 'Close Chat' : 'Open Chat'}
          placement="top"
          arrow
        >
          <IconButton color="inherit" onClick={() => setOpenChat(!openChat)}>
            <ChatIcon />
          </IconButton>
        </Tooltip>
      </FootBar>
    </AppBar>
  );
};

export default MeetingFooter;
