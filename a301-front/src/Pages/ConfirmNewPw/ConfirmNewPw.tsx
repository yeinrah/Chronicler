import React from 'react';
import styles from './ConfirmNewPw.module.css';
import { ConfirmNewPwCard } from '../../Containers';
import theme from '../../Components/Theme';
import { ThemeProvider } from '@mui/material';

const ConfirmNewPw = () => {
  return (
    <ThemeProvider theme={theme}>
      <ConfirmNewPwCard />
    </ThemeProvider>
  );
};

export default ConfirmNewPw;
