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
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';

interface Props {
  openChat: boolean;
  openParticipant: boolean;
  micOn: boolean;
  cameraOn: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenParticipant: React.Dispatch<React.SetStateAction<boolean>>;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraOn: React.Dispatch<React.SetStateAction<boolean>>;
  subtitle: any;
  leaveSession: any;
  destroySession: any;
  isMain: any;
  sessionId: any;
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
  subtitle,
  leaveSession,
  destroySession,
  isMain,
  sessionId,
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
              setCameraOn(!cameraOn);
            }}
          >
            <VideocamIcon />
          </IconButton>
        </Tooltip>
        {isMain ? (
          <Tooltip title="Close Room" placement="top" arrow>
            <IconButton color="inherit" onClick={destroySession}>
              <PhonelinkEraseIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Leave Room" placement="top" arrow>
            <IconButton color="inherit" onClick={leaveSession}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 0.8 }} />
        <Box component="div" sx={{ display: 'inline' }}>
          {subtitle}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title={'invite'} placement="top" arrow>
          <IconButton
            color="inherit"
            onClick={() => {
              Swal.fire(`${sessionId}`, `코드를 친구에게 알려주세요`);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={'info'} placement="top" arrow>
          <InfoIcon
            color="inherit"
            onClick={() => {
              Swal.fire(
                `정확도를 높이기 위해, 한문장 단위로 마이크 on/off 하기를 권장합니다.`
              );
            }}
          ></InfoIcon>
        </Tooltip>
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
