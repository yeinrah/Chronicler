import React from 'react';
import styles from './SignIn.module.css';
import { SignInCard } from '../../Containers';
import theme from '../../Components/Theme';
import { ThemeProvider } from '@mui/material';

const SignIn = () => {
  return (
    <ThemeProvider theme={theme}>
      <SignInCard />
    </ThemeProvider>
  );
};

export default SignIn;
