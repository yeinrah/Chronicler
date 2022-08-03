import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
  Button,
  TextField,
} from '@mui/material';
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 39f02675096c2232e1b82e156b106c90ccf5e44b
import styles from './ChatBlock.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  openChat: boolean;
  openParticipant: boolean;
<<<<<<< HEAD
  myUserName: string;
  mainStreamManager: any;
  session: any;
=======
  sendMessage: Function;
  message: string;
>>>>>>> 39f02675096c2232e1b82e156b106c90ccf5e44b
}

const ChatBlock: React.FC<Props> = ({
  openChat,
  openParticipant,
<<<<<<< HEAD
  myUserName,
  mainStreamManager,
  session,
}) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

=======
  sendMessage,
  message,
}) => {
>>>>>>> 39f02675096c2232e1b82e156b106c90ccf5e44b
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      phone: data.get('comment'),
    });
    sendMessage(data.get('comment'));
  };
<<<<<<< HEAD

  const sendMessage = () => {
    console.log(message);
    if (message) {
      let msg = message.replace(/ +(?= )/g, '');
      if (msg !== '' && msg !== ' ') {
        const data = {
          msg: msg,
          nickname: myUserName,
          streamId: mainStreamManager.stream.streamId,
        };
        mainStreamManager.stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        });
      }
    }
    setMessage('');
  };

=======
  const [messages, setMessages] = useState<any>([{}]);
  useEffect(() => {
    if (message) setMessages([...messages, JSON.parse(message)]);
  }, [message]);
>>>>>>> 39f02675096c2232e1b82e156b106c90ccf5e44b
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
          <CloseIcon />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          color: 'var(--eleBase-color)',
          padding: '10px',
          height: '90%',
          overflow: 'scroll',
        }}
      >
<<<<<<< HEAD
        {messageList.map((data: any, i) => (
          <Comment overflow="visible">
            <div
              key={i}
              id="remoteUsers"
              className={
                'message' +
                (data.connectionId !== session.connection.connectionId
                  ? ' left'
                  : ' right')
              }
            >
              <canvas
                id={'userImg-' + i}
                width="60"
                height="60"
                className="user-img"
              />
              <div className="msg-detail">
                <div className="msg-info">
                  <p> {data.nickname}</p>
                </div>
                <div className="msg-content">
                  <span className="triangle" />
                  <p className="text">{data.msg}</p>
                </div>
              </div>
            </div>
          </Comment>
        ))}

        {/* <Comment overflow="visible">
          <h6>User Nickname, Timestamp</h6>
          <p>
            This is a comment.
            lalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalala
          </p>
        </Comment> */}
=======
        {messages.map((item: any) => {
          console.log(item);
          return (
            <Comment overflow="visible">
              <h6>{item.name}</h6>
              <p>{item.text}</p>
            </Comment>
          );
        })}
>>>>>>> 39f02675096c2232e1b82e156b106c90ccf5e44b
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
<<<<<<< HEAD
          value={message}
          onChange={(event) => {
            event.preventDefault();
            setMessage(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') sendMessage();
          }}
=======
          autoFocus
>>>>>>> 39f02675096c2232e1b82e156b106c90ccf5e44b
        />
      </Box>
    </ChatBox>
  );
};

export default ChatBlock;
