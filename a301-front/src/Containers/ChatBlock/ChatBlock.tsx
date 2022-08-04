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
    console.log({
      phone: data.get('comment'),
    });
    sendMessage(data.get('comment'));
    console.log('asdasdasdasdasdasdasdasdasdasdasdasd');
    console.log(messageRef);
    if (messageRef.current) {
      console.log(messageRef.current);
      // messageRef.current.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'end',
      //   inline: 'nearest',
      // });
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };
  const [messages, setMessages] = useState<any>([{}]);
  useEffect(() => {
    if (message) setMessages([...messages, JSON.parse(message)]);
  }, [message]);

  const ChatBox = styled(Box)({
    padding: '1px',
    border: '1px solid black',
    margin: '1px',
  });

  const Comment = styled(Box)({
    wordBreak: 'break-all',
  });

  return (
    <ChatBox
      width="20vw"
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
          overflow: 'scroll',
        }}
      >
        {messages.map((item: any) => {
          console.log(item);
          return (
            <Comment overflow="visible">
              <h6>{item.name}</h6>
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
          autoFocus
        />
      </Box>
    </ChatBox>
  );
};

export default ChatBlock;
