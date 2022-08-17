import React, { useRef, useState } from 'react';
import styles from './FindPwCard.module.css';
import Copyright from '../../Components/Copyright';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import userInfoFindPw from '../../Api/userInfoFindPw';
import Swal from 'sweetalert2';
import { FindPw } from '../../Pages';
import requestEmailCode from '../../Api/requestEmailCode';
import { useNavigate } from 'react-router-dom';

const FindPwCard = () => {
  const inputEmail = useRef<any>();
  const inputEmailAuth = useRef<any>();
  const [emailAuth, setEmailAuth] = useState(false);
  const navigator = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const findPw = () => {
    if (emailAuth) {
      userInfoFindPw
        .post<any>('/userInfo/updatepw', {
          email: inputEmail.current.value,
          tmppwCode: inputEmailAuth.current.value,
        })
        .then(() => {
          Swal.fire('임시 패스워드를 전송했습니다.');
          navigator('/main');
        })
        .catch((error) => {
          if (error.response.status === 409) {
            Swal.fire('이미 메일로 임시 패스워드가 발급 되었습니다.');
          }
        });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ bgcolor: 'var(--eleBase-color)', marginTop: '100px' }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'var(--eleActionPos-color)' }}>
          <PolicyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Find your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={inputEmail}
          />
          <TextField
            required
            id="emailAuth"
            label="Email Address Auth Code"
            name="emailAuth"
            sx={{ width: '100%', margin: '5% 0' }}
            autoComplete="emailAuth"
            inputRef={inputEmailAuth}
            // inputRef={inputEmail}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: 'var(--eleActionPos-color)',
              color: 'var(--fontBase-color)',
              width: '100%',
              height: '100%',
              // mt: 1,
              // mb: 2,
            }}
            onClick={() => {
              if (
                inputEmail.current.value &&
                inputEmail.current.value.indexOf('@') > 0
              ) {
                requestEmailCode
                  .get(`/userInfo/findpw`, {
                    params: {
                      email: inputEmail.current.value,
                    },
                  })
                  .then(() => {
                    Swal.fire('인증이메일을 전송하였습니다.');
                    setEmailAuth(true);
                  })
                  .catch((error) => {
                    if (error.response.status === 409) {
                      Swal.fire('이미 메일로 인증번호를 발송하였습니다.');
                    } else {
                      Swal.fire('잘못된 요청입니다.');
                    }
                  });
              } else {
                Swal.fire('이메일을 입력해주세요');
              }
            }}
          >
            인증코드 보내기
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'var(--eleActionPos-color)',
              color: 'var(--fontBase-color)',
              mt: 3,
              mb: 2,
            }}
            onClick={findPw}
          >
            Find Your Password
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default FindPwCard;
