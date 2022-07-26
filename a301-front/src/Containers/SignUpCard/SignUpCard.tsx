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
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUpCard = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailError, setEnteredEmailError] = useState(false);
  const [enteredNickname, setEnteredNickname] = useState('');
  const [enteredNicknameError, setEnteredNicknameError] = useState(false);
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredPhoneError, setEnteredPhoneError] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordError, setEnteredPasswordError] = useState(false);
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');
  const [enteredPasswordConfirmError, setEnteredPasswordConfirmError] =
    useState(false);
  useEffect(() => {
    if (enteredEmail.indexOf('@') < 0 || enteredEmail.length === 0) {
      setEnteredEmailError(true);
    } else setEnteredEmailError(false);
  }, [enteredEmail]);
  useEffect(() => {
    if (enteredNickname.length > 10 || enteredNickname.length === 0) {
      setEnteredNicknameError(true);
    } else setEnteredNicknameError(false);
  }, [enteredNickname]);
  useEffect(() => {
    if (enteredPhone.indexOf('-') > 0 || enteredPhone.length === 0) {
      setEnteredPhoneError(true);
    } else setEnteredPhoneError(false);
  }, [enteredPhone]);
  useEffect(() => {
    if (enteredPassword.length < 10 || enteredPassword.length === 0) {
      setEnteredPasswordError(true);
    } else setEnteredPasswordError(false);
  }, [enteredPassword]);
  useEffect(() => {
    if (enteredPassword !== enteredPasswordConfirm) {
      setEnteredPasswordConfirmError(true);
    } else setEnteredPasswordConfirmError(false);
  }, [enteredPassword, enteredPasswordConfirm]);
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
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                <RouterLink
                  to="/signin"
                  style={{ color: 'var(--eleActionPos-color)' }}
                >
                  Already have an account? Sign in
                </RouterLink>
              </Link>
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
