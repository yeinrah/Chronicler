import React, { useEffect, useState } from 'react';
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
import userLoginedState from '../../recoil/atoms/userLoginedState';
import { useRecoilState } from 'recoil';
import userInfoState from '../../recoil/atoms/userInfoState';
import Swal from 'sweetalert2';

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
  const [open, setOpen] = useState(false);
  const [nowLogined, setNowLogined] = useRecoilState<any>(userLoginedState);
  const [nowUserInfo, setNowUserInfo] = useRecoilState<any>(userInfoState);

  return (
    <AppBar sx={{ backgroundColor: 'var(--bgExtra-color)' }}>
      <StyledToolbar>
        <Box>
          <Link
            to="/main"
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
        {nowUserInfo.nickname && (
          <MenuBox sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <Typography
              key="Logout"
              sx={{ cursor: 'pointer', fontSize: '15px' }}
              className={nowLogined ? styles.signedin : styles.signedout}
            >
              <Link
                onClick={() => {
                  localStorage.removeItem('access-token');
                  // setToken(null);
                  setNowLogined(false);
                  setNowUserInfo({});
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: '로그아웃 됨',
                  });
                }}
                style={{
                  textDecoration: 'none',
                  color: 'var(--fontBase-color)',
                }}
                to="/main"
              >
                Logout
              </Link>
            </Typography>
            <Typography
              key="MyPage"
              sx={{ cursor: 'pointer', fontSize: '15px' }}
              className={nowLogined ? styles.signedin : styles.signedout}
            >
              <Link
                to="/mypage"
                style={{
                  textDecoration: 'none',
                  color: 'var(--fontBase-color)',
                }}
              >
                MyPage
              </Link>
            </Typography>
          </MenuBox>
        )}
      </StyledToolbar>
      {nowUserInfo.nickname && (
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
            <Typography
              key="Logout"
              sx={{ cursor: 'pointer', fontSize: '15px' }}
              className={nowLogined ? styles.signedin : styles.signedout}
            >
              <Link
                onClick={() => {
                  localStorage.removeItem('access-token');
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: '로그아웃 됨',
                  });
                }}
                style={{
                  textDecoration: 'none',
                  color: 'var(--fontBase-color)',
                }}
                to="/main"
              >
                Logout
              </Link>
            </Typography>
            <Typography
              key="MyPage"
              sx={{ cursor: 'pointer', fontSize: '15px' }}
              className={nowLogined ? styles.signedin : styles.signedout}
            >
              <Link
                to="/mypage"
                style={{
                  textDecoration: 'none',
                  color: 'var(--fontBase-color)',
                }}
              >
                MyPage
              </Link>
            </Typography>
          </Box>
        </Menu>
      )}
    </AppBar>
  );
};

export default Navbar;
