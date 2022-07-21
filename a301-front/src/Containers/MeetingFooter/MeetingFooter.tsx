import React from 'react';
import './MeetingFooter.module.css';
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

const MeetingFooter = () => {
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
        <Tooltip title="Mic Off" placement="top" arrow>
          <IconButton
            color="inherit"
            sx={{ bgcolor: 'var(--eleActionNeg-color)' }}
          >
            <MicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Camera Off" placement="top" arrow>
          <IconButton
            color="inherit"
            sx={{ bgcolor: 'var(--eleActionNeg-color)' }}
          >
            <VideocamIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Leave Room" placement="top" arrow>
          <IconButton color="inherit">
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
        <Tooltip title="Participants" placement="top" arrow>
          <IconButton color="inherit">
            <GroupsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chat" placement="top" arrow>
          <IconButton color="inherit">
            <ChatIcon />
          </IconButton>
        </Tooltip>
      </FootBar>
    </AppBar>
  );
};

export default MeetingFooter;
