import React from 'react';
import './SignIn.module.css';
import { SignInCard } from '../../Containers';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#24e424',
      main: '#24e424',
      dark: '#24e424',
      contrastText: '#24e424',
    },
    secondary: {
      light: '#ea4335',
      main: '#ea4335',
      dark: '#ea4335',
      contrastText: '#ea4335',
    },
  },
});

const SignIn = () => {
  return (
    <ThemeProvider theme={theme}>
      <SignInCard />
    </ThemeProvider>
  );
};

export default SignIn;
