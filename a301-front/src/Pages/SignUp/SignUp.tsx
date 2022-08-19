import React from 'react';
import styles from './SignUp.module.css';
import { SignUpCard } from '../../Containers';
import theme from '../../Components/Theme';
import { ThemeProvider } from '@mui/material';

const SignUp = () => {
  return (
    <ThemeProvider theme={theme}>
      <SignUpCard />
    </ThemeProvider>
  );
};

export default SignUp;
