import styles from './SignUpCard.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Copyright from '../../Components/Copyright';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import userSignUpApi from '../../Api/userSignUpApi';
import Swal from 'sweetalert2';

const SignUpCard = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailError, setEnteredEmailError] = useState(false);
  const [enteredEmailErrorMsg, setEnteredEmailErrorMsg] = useState('');
  const [enteredNickname, setEnteredNickname] = useState('');
  const [enteredNicknameError, setEnteredNicknameError] = useState(false);
  const [enteredNicknameErrorMsg, setEnteredNicknameErrorMsg] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredPhoneError, setEnteredPhoneError] = useState(false);
  const [enteredPhoneErrorMsg, setEnteredPhoneErrorMsg] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordError, setEnteredPasswordError] = useState(false);
  const [enteredPasswordErrorMsg, setEnteredPasswordErrorMsg] = useState('');
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');
  const [enteredPasswordConfirmError, setEnteredPasswordConfirmError] =
    useState(false);
  const [enteredPasswordConfirmErrorMsg, setEnteredPasswordConfirmErrorMsg] =
    useState('');
  const nicknameRegex = /([^A-Za-z0-9가-힣])/g;
  const passwordRegex =
    /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  useEffect(() => {
    if (enteredEmail.length === 0) {
    } else if (
      enteredEmail.indexOf('@') < 0 ||
      enteredEmail.length < 5 ||
      enteredEmail.length > 50
    ) {
      setEnteredEmailErrorMsg('이메일 사이즈는 5에서 50입니다.');
      setEnteredEmailError(true);
    } else setEnteredEmailError(false);
  }, [enteredEmail]);
  useEffect(() => {
    if (enteredNickname.length === 0) {
    } else if (
      enteredNickname.length > 32 ||
      enteredNickname.length < 1 ||
      nicknameRegex.test(enteredNickname)
    ) {
      setEnteredNicknameErrorMsg(
        '닉네임은 1~32글자, 숫자, 영어, 한글만 가능합니다.'
      );
      setEnteredNicknameError(true);
    } else setEnteredNicknameError(false);
  }, [enteredNickname]);
  useEffect(() => {
    if (enteredPhone.length === 0) {
    } else if (
      enteredPhone.indexOf('-') > 0 ||
      enteredPhone.length !== 11 ||
      !enteredPhone.startsWith('010')
    ) {
      setEnteredPhoneErrorMsg('전화번호는 010시작, 11자리 입니다.');
      setEnteredPhoneError(true);
    } else setEnteredPhoneError(false);
  }, [enteredPhone]);
  useEffect(() => {
    if (enteredPassword.length === 0) {
    } else if (
      enteredPassword.length < 8 ||
      enteredPassword.length > 16 ||
      enteredPassword.length === 0 ||
      !passwordRegex.test(enteredPassword)
    ) {
      setEnteredPasswordErrorMsg(
        '비밀번호는 숫자, 영어, 특수문자가 적어도 1개 이상씩 포함 / 8~16글자 입니다.'
      );
      setEnteredPasswordError(true);
    } else setEnteredPasswordError(false);
  }, [enteredPassword]);
  useEffect(() => {
    if (enteredPassword !== enteredPasswordConfirm) {
      setEnteredPasswordConfirmErrorMsg('비밀번호와 일치 하지 않습니다.');
      setEnteredPasswordConfirmError(true);
    } else setEnteredPasswordConfirmError(false);
  }, [enteredPassword, enteredPasswordConfirm]);
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      nickname: data.get('nickname'),
      phone: data.get('phone'),
      password: data.get('password'),
    });
  };
  const signUP = () => {
    userSignUpApi
      .post<any>('userInfo/signup', {
        email: enteredEmail,
        nickname: enteredNickname,
        password: enteredPassword,
        phone: enteredPhone,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: '회원가입 성공',
        }).then(() => {
          navigate('/');
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops....',
          text: '회원가입 실패',
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
        <Avatar sx={{ m: 1, bgcolor: 'var(--eleActionPos-color)' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={enteredEmailError}
                onChange={(e) => {
                  setEnteredEmail(e.target.value);
                }}
              />
              {enteredEmailError ? (
                <Typography
                  component="h1"
                  variant="caption"
                  sx={{ color: 'red' }}
                >
                  {enteredEmailErrorMsg}
                </Typography>
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                autoComplete="nickname"
                error={enteredNicknameError}
                onChange={(e) => {
                  setEnteredNickname(e.target.value);
                }}
              />
              {enteredNicknameError ? (
                <Typography
                  component="h1"
                  variant="caption"
                  sx={{ color: 'red' }}
                >
                  {enteredNicknameErrorMsg}
                </Typography>
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone(Only digits)"
                name="phone"
                autoComplete="phone"
                error={enteredPhoneError}
                onChange={(e) => {
                  setEnteredPhone(e.target.value);
                }}
              />
              {enteredPhoneError ? (
                <Typography
                  component="h1"
                  variant="caption"
                  sx={{ color: 'red' }}
                >
                  {enteredPhoneErrorMsg}
                </Typography>
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={enteredPasswordError}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                }}
              />
              {enteredPasswordError ? (
                <Typography
                  component="h1"
                  variant="caption"
                  sx={{ color: 'red' }}
                >
                  {enteredPasswordErrorMsg}
                </Typography>
              ) : (
                ''
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={enteredPasswordConfirmError}
                onChange={(e) => {
                  setEnteredPasswordConfirm(e.target.value);
                }}
              />
              {enteredPasswordConfirmError ? (
                <Typography
                  component="h1"
                  variant="caption"
                  sx={{ color: 'red' }}
                >
                  {enteredPasswordConfirmErrorMsg}
                </Typography>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
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
            onClick={() => {
              if (
                enteredEmailError ||
                enteredNicknameError ||
                enteredPasswordError ||
                enteredPhoneError ||
                enteredPasswordConfirmError
              ) {
                alert('유효한 값이 아닙니다.');
              } else {
                signUP();
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink
                to="/signin"
                style={{ color: 'var(--eleActionPos-color)' }}
              >
                Already have an account? Sign in
              </RouterLink>
              {/* <RouterLink to="/signin">
                Already have an account? Sign in
              </RouterLink> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default SignUpCard;
