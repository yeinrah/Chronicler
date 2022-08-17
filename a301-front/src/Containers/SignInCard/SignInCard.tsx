import React, { useRef, useState } from 'react';
import styles from './SignInCard.module.css';
import Copyright from '../../Components/Copyright';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import userSignInApi from '../../Api/userSignInApi';
import { useRecoilState } from 'recoil';
import userInfoState from '../../recoil/atoms/userInfoState';
import userLoginedState from '../../recoil/atoms/userLoginedState';
import theme from '../../Components/Theme';
import Swal from 'sweetalert2';

const SignInCard = () => {
  const enteredEmail = useRef<any>();
  const enteredPassword = useRef<any>();
  const navigate = useNavigate();
  const [nowUserInfo, setNowUserInfo] = useRecoilState<any>(userInfoState);
  const [nowLogined, setNowLogined] = useRecoilState<any>(userLoginedState);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const signIn = () => {
    // type LoginForm = {
    //   email: string;
    //   pw: string;
    // };
    userSignInApi
      .post<any>('/userInfo/login', null, {
        params: {
          email: enteredEmail.current.value,
          pw: enteredPassword.current.value,
        },
      })
      .then((item) => {
        localStorage.setItem('access-token', item.data['access-token']);
        setNowUserInfo({
          id: item.data.loginUser.id,
          email: item.data.loginUser.email,
          nickname: item.data.loginUser.nickname,
          image: item.data.loginUser.image,
          phone: item.data.loginUser.phone,
        });
        setNowLogined(true);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: '로그인 성공',
        });
        navigate('/main');
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '로그인 실패',
        });
      });
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
        <Avatar sx={{ m: 1, bgcolor: 'var(--btnMain-color)' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ThemeProvider theme={theme}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
              inputRef={enteredEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="secondary"
              inputRef={enteredPassword}
            />
          </ThemeProvider>
          {/* <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{ color: 'var(--eleActionPos-color)' }}
              />
            }
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'var(--btnMain-color)',
              color: 'var(--fontBase-color)',
              mt: 3,
              mb: 2,
              '&:hover': { bgcolor: 'var(--btnMainHover-color)' },
            }}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link
                href="#"
                variant="body2"
                sx={{ color: 'var(--eleActionPos-color)' }}
              > */}
              <RouterLink
                to="/findemail"
                style={{ color: 'var(--btnMain-color)' }}
              >
                Forgot email?
              </RouterLink>
              {/* </Link> */}
            </Grid>
            <Grid item xs>
              {/* <Link
                href="#"
                variant="body2"
                sx={{ color: 'var(--eleActionPos-color)' }}
              > */}
              <RouterLink
                to="/findpw"
                style={{ color: 'var(--btnMain-color)' }}
              >
                Forgot password?
              </RouterLink>
              {/* </Link> */}
            </Grid>
            <Grid item>
              {/* <Link
                href="#"
                variant="body2"
                sx={{ color: 'var(--eleActionPos-color)' }}
              > */}
              <RouterLink
                to="/signup"
                style={{ color: 'var(--btnMain-color)' }}
              >
                Sign UP
              </RouterLink>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignInCard;
