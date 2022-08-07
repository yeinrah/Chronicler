import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
  Button,
  TextField,
} from '@mui/material';

import React, { useEffect, useRef, useState } from 'react';

import styles from './ChatBlock.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  openParticipant: boolean;

  sendMessage: Function;
  message: string;
}

const ChatBlock: React.FC<Props> = ({
  openChat,
  setOpenChat,
  openParticipant,

  sendMessage,
  message,
}) => {
  const messageRef: React.MutableRefObject<any> = useRef();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendMessage(data.get('comment'));
    inputMessage.current.value = '';
  };
  const [messages, setMessages] = useState<any>([{}]);
  const inputMessage = useRef<any>();
  useEffect(() => {
    if (message) {
      setMessages([...messages, JSON.parse(message)]);
    }
  }, [message]);

  useEffect(() => {
    messageRef.current.scrollTo({
      top: messageRef.current.scrollHeight,
    });
  }, [messages]);
  useEffect(() => {
    inputMessage.current.focus();
  }, [openChat]);
  const ChatBox = styled(Box)({
    padding: '1px',
    border: '1px solid black',
    margin: '1px',
    width: '20vw',
  });

  const Comment = styled(Box)({
    wordBreak: 'break-all',
  });

  return (
    <div
      className={
        openChat
          ? openParticipant
            ? styles.withParticipant
            : styles.onlyChat
          : styles.noChat
      }
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'var(--fontAccent-color)',
          }}
        >
          <Typography variant="h6">Chat</Typography>
          <CloseIcon
            onClick={() => setOpenChat(false)}
            sx={{ cursor: 'pointer' }}
          />
        </Toolbar>
      </AppBar>
      <Box
        ref={messageRef}
        sx={{
          color: 'var(--eleBase-color)',
          padding: '10px',
          height: '90%',
          overflow: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {messages.map((item: any, index: any) => {
          return (
            <Comment key={index}>
              <h4>{item.name}</h4>
              <p>{item.text}</p>
            </Comment>
          );
        })}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ height: '10%' }}
      >
        <TextField
          fullWidth
          id="comment"
          name="comment"
          variant="filled"
          autoComplete="off"
          color="success"
          placeholder="Write your comment"
          inputProps={{ style: { color: 'var(--fontBase-color)' } }}
          sx={{ color: 'var(--eleBase-color)' }}
          inputRef={inputMessage}
          autoFocus
        />
      </Box>
    </div>
  );
};

export default ChatBlock;
