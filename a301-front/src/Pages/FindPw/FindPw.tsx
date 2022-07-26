import React from 'react';
import styles from './FindPw.module.css';
import { FindPwCard } from '../../Containers';
import theme from '../../Components/Theme';
import { ThemeProvider } from '@mui/material';

const FindPw = () => {
  return (
    <ThemeProvider theme={theme}>
      <FindPwCard />
    </ThemeProvider>
  );
};

export default FindPw;
