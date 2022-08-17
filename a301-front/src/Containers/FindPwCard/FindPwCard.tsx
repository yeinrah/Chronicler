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
  ThemeProvider,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import userInfoFindPw from '../../Api/userInfoFindPw';
import Swal from 'sweetalert2';
import { FindPw } from '../../Pages';
import requestEmailCode from '../../Api/requestEmailCode';
import { Navigate, useNavigate } from 'react-router-dom';
import theme from '../../Components/Theme';
import { useRecoilState } from 'recoil';
import loadingState from '../../recoil/atoms/loadingState';
import Loading from '../../Components/Loading';
const FindPwCard = () => {
  const inputEmail = useRef<any>();
  const inputEmailAuth = useRef<any>();
  const [emailAuth, setEmailAuth] = useState(false);
  const [nowLoading, setNowLoading] = useRecoilState(loadingState);
  const navigator = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const findPw = () => {
    if (emailAuth) {
      setNowLoading(true);
      userInfoFindPw
        .post<any>('/userInfo/updatepw', {
          email: inputEmail.current.value,
          tmppwCode: inputEmailAuth.current.value,
        })
        .then(() => {
          Swal.fire({
            title: '임시 패스워드를 전송했습니다.',
            confirmButtonText: '확인',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              setNowLoading(false);
              navigator('/main');
            }
          });
        })
        .catch((error) => {
          setNowLoading(false);
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
      {nowLoading && <Loading />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'var(--btnMain-color)' }}>
          <PolicyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Find your password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <ThemeProvider theme={theme}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color="secondary"
              inputRef={inputEmail}
            />
            <TextField
              required
              id="emailAuth"
              label="Email Address Auth Code"
              name="emailAuth"
              sx={{ width: '100%', margin: '5% 0' }}
              autoComplete="emailAuth"
              color="secondary"
              inputRef={inputEmailAuth}
              // inputRef={inputEmail}
            />
          </ThemeProvider>
          <Button
            variant="contained"
            disabled={nowLoading}
            sx={{
              bgcolor: 'var(--btnMain-color)',
              color: 'var(--fontBase-color)',
              width: '100%',
              height: '100%',
              '&:hover': { bgcolor: 'var(--btnMainHover-color)' },
              // mt: 1,
              // mb: 2,
            }}
            onClick={() => {
              if (
                inputEmail.current.value &&
                inputEmail.current.value.indexOf('@') > 0
              ) {
                setNowLoading(true);
                requestEmailCode
                  .get(`/userInfo/findpw`, {
                    params: {
                      email: inputEmail.current.value,
                    },
                  })
                  .then(() => {
                    Swal.fire('인증이메일을 전송하였습니다.');
                    setNowLoading(false);
                    setEmailAuth(true);
                  })
                  .catch((error) => {
                    setNowLoading(false);
                    if (error.response.status === 409) {
                      Swal.fire('이미 메일로 인증번호를 발송하였습니다.');
                    } else {
                      Swal.fire('잘못된 요청입니다.');
                    }
                  });
              } else {
                setNowLoading(false);
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
            disabled={nowLoading}
            sx={{
              bgcolor: 'var(--btnMain-color)',
              color: 'var(--fontBase-color)',
              '&:hover': { bgcolor: 'var(--btnMainHover-color)' },
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
