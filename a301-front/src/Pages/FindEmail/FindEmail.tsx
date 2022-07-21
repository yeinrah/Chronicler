import React from 'react';
import './FindEmail.module.css';
import { FindEmailCard } from '../../Containers';
import theme from '../../Components/Theme';
import { ThemeProvider } from '@mui/material';

const FindEmail = () => {
  return (
    <ThemeProvider theme={theme}>
      <FindEmailCard />
    </ThemeProvider>
  );
};

export default FindEmail;
