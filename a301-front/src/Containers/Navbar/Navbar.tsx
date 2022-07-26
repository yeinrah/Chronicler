import React, { useState } from 'react';
import styles from './Navbar.module.css';
import {
  Typography,
  AppBar,
  Toolbar,
  styled,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const TitleTypography = styled(Typography)({
    fontFamily: 'UnifrakturMaguntia',
    fontSize: '25px',
  }) as typeof Typography;
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
  });
  const MenuBox = styled(Box)({
    display: 'flex',
    gap: 30,
  });
  const MenuItems = [
    { Name: 'Logout', Link: '#' },
    { Name: 'MyPage', Link: '#' },
  ];
  const [open, setOpen] = useState(false);
  return (
    <AppBar sx={{ backgroundColor: 'var(--bgExtra-color)' }}>
      <StyledToolbar>
        <Box>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'var(--fontBase-color)',
            }}
          >
            <TitleTypography>Chronicler</TitleTypography>
          </Link>
        </Box>
        <Box>
          <MenuIcon
            sx={{
              color: 'white',
              display: { xs: 'block', sm: 'block', md: 'none' },
            }}
            onClick={() => setOpen(!open)}
          />
        </Box>
        <MenuBox sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {MenuItems.map((item) => (
            <Typography
              key={item.Name}
              sx={{ cursor: 'pointer', fontSize: '15px' }}
            >
              <Link
                to={item.Link}
                style={{
                  textDecoration: 'none',
                  color: 'var(--fontBase-color)',
                }}
              >
                {item.Name}
              </Link>
            </Typography>
          ))}
        </MenuBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => setOpen(!open)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            width: 200,
            height: '80vh',
            backgroundColor: 'var(--fontAccent-color)',
          }}
        >
          {MenuItems.map((item) => (
            <MenuItem
              key={item.Name}
              sx={{ cursor: 'pointer', fontSize: '15px' }}
            >
              <Link
                to={item.Link}
                style={{
                  textDecoration: 'none',
                  color: 'var(--fontBase-color)',
                }}
              >
                {item.Name}
              </Link>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
