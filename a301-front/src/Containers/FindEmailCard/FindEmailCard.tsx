import React from 'react';
import './FindEmailCard.module.css';
import Copyright from '../../Components/Copyright';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';

const FindEmailCard = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      phone: data.get('phone'),
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
          <PolicyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Find your email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone(Only digits)"
            name="phone"
            autoComplete="phone"
          />
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
          >
            Find Your Email
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default FindEmailCard;
